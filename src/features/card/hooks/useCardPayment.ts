import { useMutation, useQuery } from '@tanstack/react-query';
import { cardApi } from '../api/cardApi.ts';
import { useAuth } from '../../auth/model/authStore.ts';
import { cardState } from '../utils/cardPayment.ts';
export function useCardGenerate() {return useMutation({mutationFn:cardApi.pay,retry:false});}
export function useCardStatus(id:string,enabled:boolean) {
    const user=useAuth(state=>state.user);
    return useQuery({queryKey:['card-payment',id,user?.email],queryFn:({signal})=>cardApi.get(id,signal),enabled:enabled&&!!user,
        retry:false,refetchInterval:query=>(query.state.data?.data.order_pending||cardState(query.state.data?.data.status)==='processing') ? 15000 : false});
}
