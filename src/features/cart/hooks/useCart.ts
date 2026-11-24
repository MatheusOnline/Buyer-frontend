import { useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cartApi";
import { useAuth } from "../../auth/model/authStore";
import type { AddCartItem, CartItem, CartResponse } from "../types";
import { publishCartFeedback } from "../components/cartFeedback";

export function useGetCart() {
    const user = useAuth(state=>state.user);
    return useQuery({queryKey:["cart",user?.email],queryFn:({signal})=>cartApi.list(signal),enabled:!!user,retry:1});
}

type MutationOptions<T> = {
    optimisticUpdate?:(cart:CartResponse,value:T)=>CartResponse;
    createInitial?:(value:T)=>CartResponse | undefined;
    serializeBy?:(value:T)=>string | undefined;
    onOptimisticUpdate?:(value:T)=>void;
    onError?:(error:unknown,value:T)=>void;
};
type MutationContext = {queryKey:readonly ["cart",string|undefined]};

// Delta endpoints are kept in click order for each cart item, while different
// items can still update in parallel.
const itemQueues = new Map<string,Promise<unknown>>();
const pendingByCart = new Map<string,number>();
const refreshTimers = new Map<string,ReturnType<typeof setTimeout>>();

function enqueueItemChange(key:string,operation:()=>Promise<unknown>) {
    const previous = itemQueues.get(key) ?? Promise.resolve();
    const current = previous.catch(()=>undefined).then(operation);
    itemQueues.set(key,current);
    void current.finally(()=>{if(itemQueues.get(key)===current)itemQueues.delete(key);}).catch(()=>undefined);
    return current;
}

function cartKey(queryKey:MutationContext["queryKey"]) {return JSON.stringify(queryKey);}

function useCartMutation<T>(mutationFn:(value:T)=>Promise<unknown>,options:MutationOptions<T>={}) {
    const queryClient = useQueryClient();
    const user = useAuth(state=>state.user);
    const queryKey = ["cart",user?.email] as const;
    const serializedCartKey=cartKey(queryKey);
    return useMutation<unknown,unknown,T,MutationContext>({
        mutationKey:["cart-change",user?.email],
        mutationFn:value=>{
            const operation=()=>mutationFn(value);
            const itemId=options.serializeBy?.(value);
            return itemId ? enqueueItemChange(`${serializedCartKey}:${itemId}`,operation) : operation();
        },
        onMutate:value=>{
            // Update the visible cart before waiting for either query cancellation
            // or the network. Cancel the current fetch so it cannot restore stale data.
            void queryClient.cancelQueries({queryKey});
            const timer=refreshTimers.get(serializedCartKey);
            if(timer) clearTimeout(timer);
            refreshTimers.delete(serializedCartKey);
            pendingByCart.set(serializedCartKey,(pendingByCart.get(serializedCartKey)??0)+1);
            if(options.optimisticUpdate) {
                queryClient.setQueryData<CartResponse>(queryKey,current=>current?options.optimisticUpdate!(current,value):options.createInitial?.(value));
            }
            options.onOptimisticUpdate?.(value);
            return {queryKey};
        },
        onError:(error,value)=>options.onError?.(error,value),
        onSettled:(_data,_error,_value,context)=>{
            if(!context)return;
            const key=cartKey(context.queryKey);
            const remaining=Math.max(0,(pendingByCart.get(key)??1)-1);
            if(remaining) {pendingByCart.set(key,remaining);return;}
            pendingByCart.delete(key);
            // One authoritative refresh after the last queued update, rather than
            // one refetch per click that could overwrite a newer optimistic value.
            const timer=setTimeout(()=>{
                refreshTimers.delete(key);
                void queryClient.invalidateQueries({queryKey:context.queryKey});
            },120);
            refreshTimers.set(key,timer);
        },
    });
}

export type AddCartCommand={value:string|AddCartItem;optimisticItem:CartItem};
function isAddCartCommand(value:string|AddCartItem|AddCartCommand):value is AddCartCommand {
    return typeof value==="object" && "optimisticItem" in value && "value" in value;
}
function addProductId(value:string|AddCartItem|AddCartCommand) {
    const request=isAddCartCommand(value)?value.value:value;
    return typeof request==="string"?request:request.product_id;
}
function addSkuId(value:string|AddCartItem|AddCartCommand) {
    const request=isAddCartCommand(value)?value.value:value;
    return typeof request==="string"?undefined:request.sku_id;
}
function optimisticAdd(cart:CartResponse,value:string|AddCartItem|AddCartCommand):CartResponse {
    if(!isAddCartCommand(value))return cart;
    const added=value.optimisticItem;
    const matches=cart.data.filter(item=>item.product_id===added.product_id && (!added.sku_id || item.sku_id===added.sku_id));
    if(matches.length===1) {
        const existing=matches[0];
        const quantity=Math.min(existing.quantity+added.quantity,existing.available_stock);
        return {...cart,data:cart.data.map(item=>item.id===existing.id?{...item,quantity,line_total:item.price*quantity}:item)};
    }
    return {...cart,data:[...cart.data,added]};
}
export function useAddItemToCart() {
    return useCartMutation<string|AddCartItem|AddCartCommand>(value=>cartApi.add(isAddCartCommand(value)?value.value:value),{
        serializeBy:value=>`${addProductId(value)}:${addSkuId(value)??"default"}`,
        optimisticUpdate:optimisticAdd,
        createInitial:value=>isAddCartCommand(value)?{success:true,data:[value.optimisticItem]}:undefined,
        onOptimisticUpdate:value=>{
            if(!isAddCartCommand(value))return;
            publishCartFeedback({status:"success",message:"Adicionado ao carrinho",productTitle:value.optimisticItem.title});
        },
        onError:(_error,value)=>{
            publishCartFeedback({status:"error",message:"Não foi possível adicionar ao carrinho",productTitle:isAddCartCommand(value)?value.optimisticItem.title:undefined});
        },
    });
}
export function useRemoveItemToCart() {
    return useCartMutation(cartApi.remove,{
        serializeBy:id=>id,
        optimisticUpdate:(cart,id)=>({...cart,data:cart.data.filter(item=>item.id!==id)}),
    });
}
export function useIncreaseItemToCart() {
    return useCartMutation(cartApi.increase,{
        serializeBy:id=>id,
        optimisticUpdate:(cart,id)=>({...cart,data:cart.data.map(item=>item.id===id?{...item,quantity:item.quantity+1,line_total:item.price*(item.quantity+1)}:item)}),
    });
}
export function useDecreaseItemToCart() {
    return useCartMutation(cartApi.decrease,{
        serializeBy:id=>id,
        optimisticUpdate:(cart,id)=>({...cart,data:cart.data.map(item=>item.id===id&&item.quantity>1?{...item,quantity:item.quantity-1,line_total:item.price*(item.quantity-1)}:item)}),
    });
}
export function useCartBusy() {return useIsMutating({mutationKey:["cart-change"]}) > 0;}
