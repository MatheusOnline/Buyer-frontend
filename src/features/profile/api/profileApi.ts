import axios from 'axios';
import {api} from '../../../service/api';
import {useAuth} from '../../auth/model/authStore';
import type {ProfileDraft,ProfileResponse,ProfileUpdateResponse} from '../types';
async function request<T>(action:()=>Promise<{data:T}>) {
    try{return (await action()).data;}
    catch(error){if(axios.isAxiosError(error)&&error.response?.status===401)useAuth.getState().logout();throw error;}
}
export const profileApi={
    get:(signal?:AbortSignal)=>request(()=>api.get<ProfileResponse>('/user',{signal})),
    update:(data:ProfileDraft)=>request(()=>api.patch<ProfileUpdateResponse>('/user',data)),
};
