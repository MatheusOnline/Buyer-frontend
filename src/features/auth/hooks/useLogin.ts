import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { completeAuthentication } from "../model/completeAuthentication";
export function useLogin() {
    const queryClient = useQueryClient();
    return useMutation({mutationFn:authApi.login,onSuccess:response => completeAuthentication(queryClient,response)});
}
