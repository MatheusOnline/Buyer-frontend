import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {addressesApi} from '../api/addressesApi';
import {useAuth} from '../../auth/model/authStore';
export function useAddresses() {const user=useAuth(state=>state.user);return useQuery({queryKey:['address','profile',user?.email],queryFn:({signal})=>addressesApi.list(signal),enabled:!!user,retry:(count,error)=>!(axios.isAxiosError(error)&&[400,401,403,404].includes(error.response?.status??0))&&count<1});}
export function useAddressActions() {
    const client=useQueryClient();
    const refresh=async()=>{await Promise.all([client.invalidateQueries({queryKey:['address']}),client.invalidateQueries({queryKey:['checkout']})]);};
    const create=useMutation({mutationFn:addressesApi.create,retry:false,onSuccess:refresh});
    const update=useMutation({mutationFn:addressesApi.update,retry:false,onSuccess:refresh});
    const remove=useMutation({mutationFn:addressesApi.remove,retry:false,onSuccess:refresh});
    const setDefault=useMutation({mutationFn:addressesApi.setDefault,retry:false,onSuccess:refresh});
    return {create,update,remove,setDefault,busy:create.isPending||update.isPending||remove.isPending||setDefault.isPending};
}
