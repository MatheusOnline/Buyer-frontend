import axios from "axios";
import { api } from "../../../service/api.ts";
import { useAuth } from "../../auth/model/authStore.ts";
import type { PixResponse } from "../types.ts";
export const pixApi = {
    async get(checkoutId:string,signal?:AbortSignal) {
        try {return (await api.get<PixResponse>(`/payment/${checkoutId}?provider=asaas-pix`,{signal})).data;}
        catch(error) {if(axios.isAxiosError(error)&&error.response?.status === 401) useAuth.getState().logout();throw error;}
    },
};
