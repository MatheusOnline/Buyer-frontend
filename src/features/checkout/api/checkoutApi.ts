import axios from "axios";
import { api } from "../../../service/api";
import { useAuth } from "../../auth/model/authStore";
import type { AddressDraft, CheckoutAddress, CheckoutDetail } from "../types";
import { addressPayload } from "../utils/checkoutValidation";
async function request<T>(action:()=>Promise<{data:T}>):Promise<T> {
    try {return (await action()).data;}
    catch(error) {if (axios.isAxiosError(error) && error.response?.status === 401) useAuth.getState().logout();throw error;}
}
export const checkoutApi = {
    get:(id:string,signal?:AbortSignal)=>request(()=>api.get<CheckoutDetail>(`/checkout/${id}`,{signal})),
    addresses:async (signal?:AbortSignal)=>(await request(()=>api.get<{data:CheckoutAddress[]}>("/address/list",{signal}))).data,
    createAddress:async (values:AddressDraft)=>(await request(()=>api.post<{data:CheckoutAddress}>("/address",addressPayload(values)))).data,
    selectAddress:(checkoutId:string,addressId:string)=>request(()=>api.put("/checkout/address",{checkout_id:checkoutId,address_id:addressId})),
};
