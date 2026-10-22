import axios from 'axios';
import { api } from '../../../service/api';
import { useAuth } from '../../auth/model/authStore';
export type CardResult = {payment_id:string|number;status:string;status_detail?:string;order_pending?:boolean};
type Response = {success:boolean;data:CardResult};
export type CardRequest = {checkout_id:string;cardToken:string;payment_method_id:string};
async function authenticated<T>(request:()=>Promise<{data:T}>) {
    try { return (await request()).data; }
    catch(error) { if(axios.isAxiosError(error) && error.response?.status === 401) useAuth.getState().logout(); throw error; }
}
export const cardApi = {
    pay: (body:CardRequest)=>authenticated<Response>(()=>api.post('/payment/card',body)),
    get: (id:string,signal?:AbortSignal)=>authenticated<Response>(()=>api.get(`/payment/${id}`,{signal})),
};
