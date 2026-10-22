import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { checkoutApi } from "../api/checkoutApi";
import { useAuth } from "../../auth/model/authStore";
export function useGetCheckout(id:string) {
    const user = useAuth(state=>state.user);
    return useQuery({queryKey:["checkout",id],queryFn:({signal})=>checkoutApi.get(id,signal),enabled:!!id&&!!user,refetchInterval:30000,retry:(count,error)=>!(axios.isAxiosError(error)&&[400,401,403,404].includes(error.response?.status??0))&&count<1});
}
export function useCheckoutAddresses(enabled:boolean) {
    const user = useAuth(state=>state.user);
    return useQuery({queryKey:["address",user?.email],queryFn:({signal})=>checkoutApi.addresses(signal),enabled:enabled&&!!user,retry:1});
}
export function useSelectCheckoutAddress(checkoutId:string) {
    const client = useQueryClient();
    return useMutation({mutationFn:(addressId:string)=>checkoutApi.selectAddress(checkoutId,addressId),onSuccess:()=>client.invalidateQueries({queryKey:["checkout",checkoutId]})});
}
export function useCreateCheckoutAddress() {
    const client = useQueryClient();
    return useMutation({mutationFn:checkoutApi.createAddress,onSuccess:()=>client.invalidateQueries({queryKey:["address"]})});
}
