import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { completeAuthentication } from "../model/completeAuthentication";
export function useRegister() {
    const queryClient = useQueryClient();
    return useMutation({mutationFn:authApi.register,onSuccess:response => completeAuthentication(queryClient,response)});
}
