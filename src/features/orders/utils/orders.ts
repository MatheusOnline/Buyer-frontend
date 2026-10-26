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

export function deliveryStatus(item:import('../types').Fulfillment){
 if(item.payment_status==='refunded'||item.payment_status==='charged_back')return {key:'closed',label:'Pagamento estornado',description:'Consulte o suporte para informações sobre o pagamento.'};
 if(item.delivery_reported_at)return {key:'review',label:'Entrega em análise',description:'Você informou que não recebeu este pacote.'};
 if(item.receipt_confirmed_at)return {key:'delivered',label:'Recebimento confirmado',description:'Você confirmou que recebeu este pacote.'};
 switch(item.status){case 'delivered':return {key:'delivered',label:'Entregue',description:'A entrega foi registrada. Confirme se você recebeu o pacote.'};case 'shipped':return {key:'shipped',label:'A caminho',description:'O pacote já foi coletado e está a caminho do seu endereço.'};case 'ready':return {key:'preparing',label:'Pronto para coleta',description:'A loja terminou o preparo e aguarda o entregador.'};case 'preparing':return {key:'preparing',label:'Em preparação',description:'A loja está preparando seu pacote.'};case 'stock_review':return {key:'review',label:'Pedido em análise',description:'A loja está conferindo os itens do pedido.'};default:return {key:'paid',label:'Pagamento confirmado',description:'A loja recebeu seu pedido e iniciará o preparo.'};}
}
export function purchaseStatus(order:Pick<Order,'status'|'expires_at'|'payment_id'|'fulfillments'>){const payment=orderStatus(order);const deliveries=order.fulfillments??[];if(payment.key!=='paid'||!deliveries.length)return payment;if(deliveries.length===1)return deliveryStatus(deliveries[0]);const refunded=deliveries.filter(item=>['refunded','charged_back'].includes(item.payment_status));if(refunded.length===deliveries.length)return {key:'closed',label:'Pagamento estornado'};if(refunded.length)return {key:'review',label:'Estorno parcial'};if(deliveries.some(item=>item.delivery_reported_at))return {key:'review',label:'Entrega em análise'};if(deliveries.every(item=>!!item.receipt_confirmed_at))return {key:'delivered',label:'Recebimento confirmado'};if(deliveries.every(item=>item.status==='delivered'))return {key:'delivered',label:'Entregue'};if(deliveries.some(item=>item.status==='delivered'))return {key:'shipped',label:'Entrega parcial'};if(deliveries.some(item=>item.status==='shipped'))return {key:'shipped',label:'A caminho'};return {key:'preparing',label:'Em preparação'};}
export function deliveryDate(value:string|null){return value&&Number.isFinite(new Date(value).getTime())?new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(value)):null;}
export function supportLinks(reference:string){const text=`Olá! Preciso de ajuda com o pedido ${reference} do ComprasLocal. O pedido consta como entregue, mas não recebi o pacote.`;const email=import.meta.env.VITE_SUPPORT_EMAIL?.trim()||'matheus.francisco20021@gmail.com';const phone=(import.meta.env.VITE_SUPPORT_WHATSAPP||'5544999093250').replace(/\D/g,'');return {email:`mailto:${email}?subject=${encodeURIComponent(`Não recebi meu pedido ${reference}`)}&body=${encodeURIComponent(text)}`,whatsapp:`https://wa.me/${phone}?text=${encodeURIComponent(text)}`};}
