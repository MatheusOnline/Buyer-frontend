
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../features/auth/model/authStore";
import { api } from "./api";




import { authApi } from "../features/auth/api/authApi";
export { useLogin } from "../features/auth/hooks/useLogin";
const fetchMe = authApi.me;
const fetchLogout = authApi.logout;

export { useRegister } from "../features/auth/hooks/useRegister";

const fetchForgorPassword = async (email:string) => {
    const response = await api.post(
        `/auth/forgotpassword`,{email}
    )

    return response.data
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: fetchForgorPassword,
  });
}


const fetchVerifyCode = async (value:VerifyCode) => {
    const response = await api.post(
        `/auth/verifycode `,
        value
    )

    return response.data
}

export function useVerifyCode() {
  return useMutation({
    mutationFn: fetchVerifyCode,
  });
}

const fetchCreatePassword= async (value:CreatePasswordData) => {
    const response = await api.post(
        `/auth/update `,value)

    return response.data
}

export function useCreatePassword() {
  return useMutation({
    mutationFn: fetchCreatePassword,
  });
}

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

type VerifyCode = {
  code: string
  recoverToken: string
}

type CreatePasswordData = {
  recoverToken: string
  password: string
}