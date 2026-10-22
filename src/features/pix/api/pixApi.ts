import axios from "axios";
import { api } from "../../../service/api";
import { useAuth } from "../../auth/model/authStore";
import type { PixResponse } from "../types";
export const pixApi = {
    async get(checkoutId:string,signal?:AbortSignal) {
        try {return (await api.get<PixResponse>(`/payment/${checkoutId}`,{signal})).data;}
        catch(error) {if(axios.isAxiosError(error)&&error.response?.status === 401) useAuth.getState().logout();throw error;}
    },
};
