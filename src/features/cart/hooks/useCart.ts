import { useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cartApi";
import { useAuth } from "../../auth/model/authStore";
export function useGetCart() {
    const user = useAuth(state=>state.user);
    return useQuery({queryKey:["cart",user?.email],queryFn:({signal})=>cartApi.list(signal),enabled:!!user,retry:1});
}
function useCartMutation<T>(mutationFn:(value:T)=>Promise<unknown>) {
    const queryClient = useQueryClient();
    return useMutation({mutationKey:["cart-change"],mutationFn,onSuccess:()=>queryClient.invalidateQueries({queryKey:["cart"]}),onError:()=>{void queryClient.invalidateQueries({queryKey:["cart"]});}});
}
export function useAddItemToCart() {return useCartMutation(cartApi.add);}
export function useRemoveItemToCart() {return useCartMutation(cartApi.remove);}
export function useIncreaseItemToCart() {return useCartMutation(cartApi.increase);}
export function useDecreaseItemToCart() {return useCartMutation(cartApi.decrease);}
export function useCartBusy() {return useIsMutating({mutationKey:["cart-change"]}) > 0;}
