import axios from 'axios';
import {api} from '../../../service/api';
import {useAuth} from '../../auth/model/authStore';
import type {AddressResponse,AddressValues,SavedAddress} from '../types';
import {savedAddressPayload} from '../utils/addressForm';
async function request<T>(action:()=>Promise<{data:T}>) {try{return (await action()).data;}catch(error){if(axios.isAxiosError(error)&&error.response?.status===401)useAuth.getState().logout();throw error;}}
export const addressesApi={
    list:(signal?:AbortSignal)=>request(()=>api.get<{success:boolean;data:SavedAddress[]}>('/address/list',{signal})),
    create:(values:AddressValues)=>request(()=>api.post<AddressResponse>('/address',savedAddressPayload(values))),
    update:({id,values}:{id:string;values:AddressValues})=>request(()=>api.patch<AddressResponse>(`/address/${id}`,savedAddressPayload(values))),
    remove:(id:string)=>request(()=>api.delete(`/address/${id}`)),
    setDefault:(id:string)=>request(()=>api.patch<AddressResponse>(`/address/${id}/default`)),
};
