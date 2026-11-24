import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi.ts";
import { completeAuthentication } from "../model/completeAuthentication.ts";
export function useLogin() {
    const queryClient = useQueryClient();
    return useMutation({mutationFn:authApi.login,onSuccess:response => completeAuthentication(queryClient,response)});
}
