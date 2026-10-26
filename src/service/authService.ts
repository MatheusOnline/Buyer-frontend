
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../features/auth/model/authStore";




import { authApi } from "../features/auth/api/authApi";
export { useLogin } from "../features/auth/hooks/useLogin";
const fetchMe = authApi.me;
const fetchLogout = authApi.logout;

export { useRegister } from "../features/auth/hooks/useRegister";

export function useMe(){
   return useQuery({
          queryKey: ["user"],
          queryFn: () => fetchMe()
      });
}

export function useLogout(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      useAuth.getState().logout();
      queryClient.clear();
    },
  })
}
