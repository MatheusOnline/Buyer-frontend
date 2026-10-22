import axios from 'axios';
import {api} from '../../../service/api';
import {useAuth} from '../../auth/model/authStore';
import type {OrderFilter,OrderResponse} from '../types';
import type {CheckoutDetail} from '../../checkout/types';
async function request<T>(action:()=>Promise<{data:T}>) {try{return (await action()).data;}catch(error){if(axios.isAxiosError(error)&&error.response?.status===401)useAuth.getState().logout();throw error;}}
export const ordersApi={
    list:(page:number,status:OrderFilter,signal?:AbortSignal)=>request(()=>api.get<OrderResponse>('/checkout',{params:{page,status},signal})),
    detail:(id:string,signal?:AbortSignal)=>request(()=>api.get<CheckoutDetail>(`/checkout/${id}`,{signal})),
};
