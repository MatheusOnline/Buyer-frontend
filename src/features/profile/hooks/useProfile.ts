import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {profileApi} from '../api/profileApi';
import {useAuth} from '../../auth/model/authStore';
import type {ProfileResponse} from '../types';
export function useProfile() {
    const user=useAuth(state=>state.user);
    return useQuery({queryKey:['profile',user?.email],queryFn:({signal})=>profileApi.get(signal),enabled:!!user,retry:(count,error)=>!(axios.isAxiosError(error)&&[401,403,404].includes(error.response?.status??0))&&count<1});
}
export function useUpdateProfile() {
    const client=useQueryClient();
    return useMutation({mutationFn:profileApi.update,retry:false,onSuccess:response=>{
        const current=useAuth.getState().user;
        const old=client.getQueryData<ProfileResponse>(['profile',current?.email]);
        if(!current)return;
        if(old) {
            const profile={...old.data,...response.data};
            client.setQueryData(['profile',response.data.email],{...old,data:profile});
            useAuth.getState().setUser({name:[profile.firstname,profile.lastname].filter(Boolean).join(' '),email:profile.email,cpf:profile.cpf});
        } else useAuth.getState().setUser({...current,name:response.data.firstname,email:response.data.email});
        if(current.email!==response.data.email)client.removeQueries({queryKey:['profile',current.email],exact:true});
        void client.invalidateQueries({queryKey:['user']});
    }});
}
