import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {ordersApi} from '../api/ordersApi';
import {useAuth} from '../../auth/model/authStore';
import type {OrderFilter,OrderResponse,BuyerOrderDetail,Fulfillment} from '../types';
const retry=(count:number,error:unknown)=>!(axios.isAxiosError(error)&&[400,401,403,404].includes(error.response?.status??0))&&count<1;
export function useOrders(page:number,filter:OrderFilter) {const user=useAuth(state=>state.user);return useQuery({queryKey:['orders',user?.email,page,filter],queryFn:({signal})=>ordersApi.list(page,filter,signal),enabled:!!user,retry,refetchInterval:30000});}
export function useOrderDetail(id:string|null) {const user=useAuth(state=>state.user);return useQuery({queryKey:['orders','detail',user?.email,id],queryFn:({signal})=>ordersApi.detail(id!,signal),enabled:!!user&&!!id,retry,refetchInterval:15000});}

export function useDeliveryResponse(){const client=useQueryClient();const user=useAuth(s=>s.user);return useMutation({mutationFn:({id,action}:{id:string;action:'confirm'|'report'})=>action==='confirm'?ordersApi.confirmReceipt(id):ordersApi.reportMissing(id),onSuccess:response=>{const updated=response.data;const merge=(items:Fulfillment[]|undefined)=>items?.map(item=>item.id===updated.id?updated:item);client.setQueriesData<OrderResponse>({queryKey:['orders'],predicate:query=>query.queryKey[1]!=='detail'},old=>old?{...old,data:{...old.data,orders:old.data.orders.map(order=>({...order,fulfillments:merge(order.fulfillments)}))}}:old);client.setQueryData<BuyerOrderDetail>(['orders','detail',user?.email,updated.checkout_id],old=>old?{...old,fulfillments:merge(old.fulfillments)}:old);void client.invalidateQueries({queryKey:['orders']});}});}
