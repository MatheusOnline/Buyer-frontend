import axios from "axios";
import { api } from "../../../service/api";
import { useAuth } from "../../auth/model/authStore";
import type { CardProductProps } from "../../../types/types";
export type FavoritesResponse = {success:boolean;data:{products:CardProductProps[];pagination:{page:number;limit:number;totalItems:number;totalPages:number}}};
export const favoritesApi = {
    async list(page:number,signal?:AbortSignal) {
        try {return (await api.get<FavoritesResponse>("/like",{params:{page,limit:20},signal})).data;}
        catch(error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) useAuth.getState().logout();
            throw error;
        }
    },
    async toggle(productId:string) {
        return (await api.post<{success:boolean;data:{liked:boolean}}>("/like/toggle",{product_id:productId})).data;
    },
};
