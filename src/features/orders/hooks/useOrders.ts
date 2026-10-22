import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {ordersApi} from '../api/ordersApi';
import {useAuth} from '../../auth/model/authStore';
import type {OrderFilter} from '../types';
const retry=(count:number,error:unknown)=>!(axios.isAxiosError(error)&&[400,401,403,404].includes(error.response?.status??0))&&count<1;
export function useOrders(page:number,filter:OrderFilter) {const user=useAuth(state=>state.user);return useQuery({queryKey:['orders',user?.email,page,filter],queryFn:({signal})=>ordersApi.list(page,filter,signal),enabled:!!user,retry,refetchInterval:30000});}
export function useOrderDetail(id:string|null) {const user=useAuth(state=>state.user);return useQuery({queryKey:['orders','detail',user?.email,id],queryFn:({signal})=>ordersApi.detail(id!,signal),enabled:!!user&&!!id,retry});}
