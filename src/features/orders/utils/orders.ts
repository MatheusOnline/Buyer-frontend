import type {Order,OrderFilter} from '../types';
export function orderFilter(value:string|null):OrderFilter {return ['pending','paid','closed'].includes(value??'')?value as OrderFilter:'all';}
export function orderPage(value:string|null) {const page=Number(value);return Number.isSafeInteger(page)&&page>=1&&page<=100000?page:1;}
export function orderStatus(order:Pick<Order,'status'|'expires_at'|'payment_id'>,now=Date.now()) {
    if(order.status==='paid')return {key:'paid',label:'Pagamento aprovado'};
    if(order.status==='cancelled')return {key:'closed',label:'Compra cancelada'};
    if(order.status==='expired'||(!order.payment_id&&order.expires_at&&new Date(order.expires_at).getTime()<=now))return {key:'closed',label:'Compra expirada'};
    return {key:'pending',label:order.payment_id?'Aguardando confirmação':'Aguardando pagamento'};
}
export function paymentLink(order:Pick<Order,'checkoutId'|'payment_id'|'payment_method'|'status'|'expires_at'>) {
    if(orderStatus(order).key==='closed')return null;
    if(order.payment_id&&order.payment_method==='pix')return `/payment/pix/${order.checkoutId}`;
    if(order.payment_id&&order.payment_method==='card')return `/payment/card/${order.checkoutId}`;
    if(order.status==='paid')return null;
    return `/payment/checkout/${order.checkoutId}`;
}
export function orderDate(value:string|null) {if(!value||!Number.isFinite(new Date(value).getTime()))return 'Data indisponível';return new Intl.DateTimeFormat('pt-BR',{dateStyle:'medium'}).format(new Date(value));}
