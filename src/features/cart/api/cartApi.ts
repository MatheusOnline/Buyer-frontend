import axios from "axios";
import { api } from "../../../service/api";
import { useAuth } from "../../auth/model/authStore";
import type { AddCartItem, CartResponse } from "../types";
async function request<T>(operation:()=>Promise<{data:T}>):Promise<T> {
    try {return (await operation()).data;}
    catch(error) {if (axios.isAxiosError(error) && error.response?.status === 401) useAuth.getState().logout();throw error;}
}
export const cartApi = {
    list:(signal?:AbortSignal)=>request(()=>api.get<CartResponse>("/cart",{signal})),
    add:(value:string|AddCartItem)=>request(()=>api.post("/cart",typeof value === "string" ? {product_id:value} : value)),
    remove:(id:string)=>request(()=>api.delete(`/cart/${id}`)),
    increase:(id:string)=>request(()=>api.patch(`/cart/${id}/increase`)),
    decrease:(id:string)=>request(()=>api.patch(`/cart/${id}/decrease`)),
};
