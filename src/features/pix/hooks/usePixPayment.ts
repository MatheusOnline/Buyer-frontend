import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { pixApi } from "../api/pixApi";
import { useAuth } from "../../auth/model/authStore";
export function usePixPayment(checkoutId:string) {
    const user=useAuth(state=>state.user);
    return useQuery({queryKey:["payment",checkoutId,user?.email],queryFn:({signal})=>pixApi.get(checkoutId,signal),enabled:!!checkoutId&&!!user,
        refetchInterval:query=>["approved","cancelled","rejected","refunded","charged_back"].includes(query.state.data?.data.status??"") ? false : 15000,
        retry:(count,error)=>!(axios.isAxiosError(error)&&[400,401,403,404].includes(error.response?.status??0))&&count<1,
    });
}
