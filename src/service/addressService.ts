
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "./api.ts";



type AddressTypes = {
    label: string
    city: string
    street: string
    number: string,
    postal_code: string
    district: string
    reference: string
    complement: string

}


const fetchList = async () => {
  const response = await api.get("/address/list")

  return response.data
}

const fetchDelete = async (id: string) => {
    const response = await api.delete(`address/${id}`);
    return response.data;
};

const fetchCreate = async(data:AddressTypes) => {
    const response = await api.post(`address`,data)

    return response.data
}



export function useListAddress(){
   return useQuery({
          queryKey: ["address"],
          queryFn: () => fetchList()
      });
}



export function useDeleteAddress() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: fetchDelete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["address"]
            })
        }
    });
}


export function useCreateAddress(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: fetchCreate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["address"]
            })
        }
    })
}

