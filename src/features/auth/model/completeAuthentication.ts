import type { QueryClient } from "@tanstack/react-query";
import type { SessionResponse } from "../types.ts";
import { useAuth } from "./authStore.ts";
export function completeAuthentication(queryClient:QueryClient,response:SessionResponse) {
    queryClient.removeQueries({predicate:query => !["products","product"].includes(String(query.queryKey[0]))});
    useAuth.getState().setUser(response.data);
    queryClient.setQueryData(["user"],response);
    void queryClient.invalidateQueries({queryKey:["products"]});
}
