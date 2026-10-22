import { useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "../api/favoritesApi";
import { useAuth } from "../../auth/model/authStore";
export function useGetLikes(page=1) {
    const user = useAuth(state => state.user);
    return useQuery({queryKey:["like",user?.email,page],queryFn:({signal}) => favoritesApi.list(page,signal),enabled:!!user,retry:1});
}
export function useLikedProduct() {
    const queryClient = useQueryClient();
    const pending = useIsMutating({mutationKey:["favorite-toggle"]});
    const mutation = useMutation({mutationKey:["favorite-toggle"],mutationFn:favoritesApi.toggle,
        onSuccess:async () => {
            await Promise.all([queryClient.invalidateQueries({queryKey:["like"]}),queryClient.invalidateQueries({queryKey:["products"]}),queryClient.invalidateQueries({queryKey:["product"]})]);
        },
    });
    return {...mutation,isPending:mutation.isPending || pending > 0};
}
