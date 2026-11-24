import { useMutation, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { favoritesApi, type FavoritesResponse } from "../api/favoritesApi.ts";
import { useAuth } from "../../auth/model/authStore.ts";
import type { CardProductProps, ProductInformationProps } from "../../../types/types.ts";
import type { CatalogResponse } from "../../../service/productsService.ts";

export function useGetLikes(page=1) {
    const user=useAuth(state=>state.user);
    return useQuery({queryKey:["like",user?.email,page],queryFn:({signal})=>favoritesApi.list(page,signal),enabled:!!user,retry:1});
}

export type FavoriteToggleInput={productId:string;currentlyLiked:boolean};
type CatalogCache=CatalogResponse|InfiniteData<CatalogResponse>;
type ProductDetailsCache={data?:ProductInformationProps};

// Serialize toggles for the same product so fast repeated taps keep their order.
const toggleQueues=new Map<string,Promise<unknown>>();
const pendingByUser=new Map<string,number>();
const refreshTimers=new Map<string,ReturnType<typeof setTimeout>>();

function enqueueToggle(key:string,productId:string) {
    const previous=toggleQueues.get(key)??Promise.resolve();
    const current=previous.catch(()=>undefined).then(()=>favoritesApi.toggle(productId));
    toggleQueues.set(key,current);
    void current.finally(()=>{if(toggleQueues.get(key)===current)toggleQueues.delete(key);}).catch(()=>undefined);
    return current;
}

function patchCatalogPage(page:CatalogResponse,id:string,liked:boolean):CatalogResponse {
    if(!page?.data?.products)return page;
    return {...page,data:{...page.data,products:page.data.products.map(product=>product.id===id?{...product,liked}:product)}};
}

function patchCatalogCache(cache:CatalogCache,id:string,liked:boolean):CatalogCache {
    if("pages" in cache)return {...cache,pages:cache.pages.map(page=>patchCatalogPage(page,id,liked))};
    return patchCatalogPage(cache,id,liked);
}

function findCard(queryClient:ReturnType<typeof useQueryClient>,id:string):CardProductProps|undefined {
    const catalogs=queryClient.getQueriesData<CatalogCache>({queryKey:["products"]});
    for(const [,cache] of catalogs) {
        if(!cache)continue;
        const pages="pages" in cache?cache.pages:[cache];
        for(const page of pages) {
            const product=page.data?.products?.find(item=>item.id===id);
            if(product)return product;
        }
    }
    const details=queryClient.getQueryData<ProductDetailsCache>(["product",id])?.data;
    if(!details)return undefined;
    return {
        id:details.id,title:details.title,code:details.code,image:details.image??details.images?.[0]??"",
        store:details.store??"Loja local",original_price:Number(details.original_price),current_price:details.current_price??undefined,
        available_stock:details.available_stock??details.stock,liked:false,promotion:details.promotion??null,
    };
}

function isLikedInCache(queryClient:ReturnType<typeof useQueryClient>,productId:string,fallback:boolean) {
    const favorites=queryClient.getQueriesData<FavoritesResponse>({queryKey:["like"]});
    if(favorites.some(([,data])=>data?.data.products.some(product=>product.id===productId)))return true;
    const catalogs=queryClient.getQueriesData<CatalogCache>({queryKey:["products"]});
    for(const [,cache] of catalogs) {
        if(!cache)continue;
        const pages="pages" in cache?cache.pages:[cache];
        for(const page of pages) {
            const product=page.data?.products?.find(item=>item.id===productId);
            if(product && typeof product.liked==="boolean")return product.liked;
        }
    }
    return fallback;
}

function patchFavorites(data:FavoritesResponse|undefined,id:string,liked:boolean,card?:CardProductProps):FavoritesResponse|undefined {
    if(!data)return data;
    const existing=data.data.products.some(product=>product.id===id);
    let products=data.data.products;
    if(!liked)products=products.filter(product=>product.id!==id);
    else if(!existing&&card&&data.data.pagination.page===1)products=[{...card,liked:true},...products];
    const delta=liked&&!existing&&card&&data.data.pagination.page===1?1:!liked&&existing?-1:0;
    const totalItems=Math.max(0,data.data.pagination.totalItems+delta);
    const limit=Math.max(1,data.data.pagination.limit);
    return {...data,data:{...data.data,products,pagination:{...data.data.pagination,totalItems,totalPages:Math.max(1,Math.ceil(totalItems/limit))}}};
}

export function useLikedProduct() {
    const queryClient=useQueryClient();
    const user=useAuth(state=>state.user);
    const userKey=user?.email??"anonymous";
    return useMutation<unknown,unknown,FavoriteToggleInput>({
        mutationKey:["favorite-toggle",userKey],
        mutationFn:input=>enqueueToggle(`${userKey}:${input.productId}`,input.productId),
        onMutate:input=>{
            const currentlyLiked=isLikedInCache(queryClient,input.productId,input.currentlyLiked);
            const nextLiked=!currentlyLiked;
            const card=findCard(queryClient,input.productId);
            void queryClient.cancelQueries({queryKey:["products"]});
            void queryClient.cancelQueries({queryKey:["product",input.productId]});
            void queryClient.cancelQueries({queryKey:["like"]});
            for(const [key,data] of queryClient.getQueriesData<CatalogCache>({queryKey:["products"]})) {
                if(data)queryClient.setQueryData(key,patchCatalogCache(data,input.productId,nextLiked));
            }
            queryClient.setQueryData<ProductDetailsCache>(["product",input.productId],current=>current?.data?{...current,data:{...current.data,liked:nextLiked} as ProductInformationProps}:current);
            for(const [key,data] of queryClient.getQueriesData<FavoritesResponse>({queryKey:["like"]})) {
                const page=Number(key[2]??1);
                queryClient.setQueryData(key,patchFavorites(data,input.productId,nextLiked,page===1?card:undefined));
            }
            pendingByUser.set(userKey,(pendingByUser.get(userKey)??0)+1);
        },
        onSettled:()=>{
            const remaining=Math.max(0,(pendingByUser.get(userKey)??1)-1);
            if(remaining){pendingByUser.set(userKey,remaining);return;}
            pendingByUser.delete(userKey);
            const oldTimer=refreshTimers.get(userKey);
            if(oldTimer)clearTimeout(oldTimer);
            const timer=setTimeout(()=>{
                refreshTimers.delete(userKey);
                void Promise.all([
                    queryClient.invalidateQueries({queryKey:["like"]}),
                    queryClient.invalidateQueries({queryKey:["products"]}),
                    queryClient.invalidateQueries({queryKey:["product"]}),
                ]);
            },120);
            refreshTimers.set(userKey,timer);
        },
    });
}
