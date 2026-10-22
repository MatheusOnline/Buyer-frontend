import {useEffect,useRef} from 'react';
import {FiX} from 'react-icons/fi';
import {useOrderDetail} from '../hooks/useOrders';
import {orderStatus,paymentLink} from '../utils/orders';
import {money} from '../../cart/utils/cartTotals';
import {Button,Feedback} from '../../profile/components/profile.styles';
import {Skeleton} from '../../../Components/UI/Skeleton/Skeleton';
import {OrderProducts} from './OrderProducts';
import {Action,Badge,Detail,Dialog} from './orders.styles';
export function OrderDetails({id,onClose}:{id:string;onClose:()=>void}) {
    const ref=useRef<HTMLDialogElement>(null);
    const query=useOrderDetail(id);
    const order=query.data;
    useEffect(()=>{const dialog=ref.current;dialog?.showModal();return()=>dialog?.close();},[]);
    const state=order?orderStatus(order):null;
    const link=order?paymentLink(order):null;
    return <Dialog ref={ref} aria-labelledby="order-detail-title" onCancel={onClose}><header><h2 id="order-detail-title">Detalhes da compra</h2><Button type="button" onClick={onClose} aria-label="Fechar detalhes"><FiX/></Button></header>
        {query.isLoading?<div aria-label="Carregando detalhes" aria-busy="true"><Skeleton height="340px"/></div>:!order?<><Feedback role="alert" $error>Não foi possível carregar os detalhes desta compra.</Feedback><Button disabled={query.isFetching} onClick={()=>query.refetch()}>Tentar novamente</Button></>:<Detail>
            {state&&<Badge $status={state.key}>{state.label}</Badge>}<small>Referência: {id}</small><OrderProducts items={order.products}/>
            <section><h3>Resumo do pagamento</h3><dl><dt>Produtos</dt><dd>{money(order.subtotal)}</dd>{Number(order.discount)>0&&<><dt>Desconto</dt><dd>− {money(order.discount)}</dd></>}<dt>Total da compra</dt><dd><strong>{money(order.total)}</strong></dd><dt>Forma de pagamento</dt><dd>{order.payment_method==='pix'?'Pix':order.payment_method==='card'?'Cartão':'Ainda não selecionada'}</dd></dl></section>
            <section><h3>Endereço da compra</h3>{order.address?<><p>{order.address.label}</p><p>{order.address.street}, {order.address.number}{order.address.complement?` · ${order.address.complement}`:''}</p><p>{order.address.district} · {order.address.city}</p><p>CEP {order.address.postal_code}</p>{order.address.reference&&<p>Referência: {order.address.reference}</p>}</>:<p>Nenhum endereço disponível para esta compra.</p>}</section>
            {state?.key==='paid'&&<p>O pagamento foi confirmado. Informações de envio e entrega ainda não estão disponíveis nesta página.</p>}
            {link&&<Action to={link}>{order.payment_id?'Ver pagamento':'Continuar compra'}</Action>}
        </Detail>}
    </Dialog>;
}
