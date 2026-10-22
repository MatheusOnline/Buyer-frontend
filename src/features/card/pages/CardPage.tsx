import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FiArrowLeft, FiCheckCircle, FiChevronRight, FiClock, FiCreditCard, FiLock, FiMapPin, FiRefreshCw, FiXCircle } from 'react-icons/fi';
import styled from 'styled-components';
import { DefaultTemplate } from '../../../Template/DefaultTemplate';
import { ScrollToTop } from '../../../Components/UI/ScrollToTop';
import { Skeleton } from '../../../Components/UI/Skeleton/Skeleton';
import { useGetCheckout } from '../../checkout/hooks/useCheckout';
import { CheckoutProducts } from '../../checkout/components/CheckoutProducts';
import { money } from '../../cart/utils/cartTotals';
import { CardForm } from '../components/CardForm';
import { useCardGenerate, useCardStatus } from '../hooks/useCardPayment';
import { cardMessages, cardState } from '../utils/cardPayment';
import type { CardRequest, CardResult } from '../api/cardApi';
import { Action, Actions, Back, Breadcrumb, Button, ErrorBox, Heading, Layout, Panel, Reference, Result, Stack, StatusText } from '../../pix/components/pix.styles';
export default function CardPage() {const {checkoutId}=useParams();return <CardContent key={checkoutId} id={checkoutId??''}/>;}
function CardContent({id}:{id:string}) {
    const checkout=useGetCheckout(id);
    const detail=checkout.data;
    const client=useQueryClient();
    const mutation=useCardGenerate();
    const [result,setResult]=useState<CardResult>();
    const [uncertain,setUncertain]=useState(false);
    const [now,setNow]=useState(Date.now);
    const submitting=useRef(false);
    const status=useCardStatus(id,!!detail?.payment_id||!!result||uncertain);
    const payment=status.data?.data??result;
    const approved=payment ? payment.status==='approved' : detail?.status==='paid';
    const state=approved?'approved':cardState(payment?.status);
    const message=payment?.order_pending&&approved?{title:'Pagamento aprovado, preparando seu pedido',description:'O pagamento foi confirmado. Estamos registrando o pedido para a loja; esta página acompanha a atualização. Não é necessário pagar novamente.'}:cardMessages[state];
    const expired=detail?.status==='expired'||(detail?.expires_at&&new Date(detail.expires_at).getTime()<=now);
    const blocked=detail?.status==='cancelled'||expired||!detail?.address||!Number.isFinite(Number(detail?.total))||Number(detail?.total)<=0;
    const hasPayment=!!detail?.payment_id||!!payment||uncertain||approved;
    useEffect(()=>{const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer);},[]);
    useEffect(()=>{if(approved)for(const key of ['checkout','cart','orders'])void client.invalidateQueries({queryKey:[key]});},[approved,client,payment?.order_pending]);
    async function pay(body:CardRequest) {
        if(submitting.current||hasPayment||blocked)return;
        submitting.current=true;
        try {const response=await mutation.mutateAsync(body);setResult(response.data);void client.invalidateQueries({queryKey:['checkout',id]});}
        catch {setUncertain(true);void client.invalidateQueries({queryKey:['checkout',id]});}
        finally {submitting.current=false;}
    }
    return <DefaultTemplate><ScrollToTop/><Breadcrumb aria-label="Navegação do pagamento"><Link to="/">Início</Link><FiChevronRight/><Link to="/cart">Carrinho</Link><FiChevronRight/><span>Pagamento com cartão</span></Breadcrumb>
        <Heading><div><small>ÚLTIMA ETAPA DA SUA COMPRA</small><h1>{approved?'Sua compra foi confirmada':'Pagamento com cartão'}</h1><p>{hasPayment?'Acompanhe a confirmação do pagamento e os detalhes da sua compra.':'Confira seu pedido e preencha os dados para finalizar a compra.'}</p></div><Back to={`/payment/checkout/${id}`}><FiArrowLeft/>Voltar ao checkout</Back></Heading>
        {checkout.isLoading?<Layout aria-busy="true"><Skeleton height="480px"/><Skeleton height="320px"/></Layout>:!detail?<Result role="alert"><FiCreditCard/><h2>Não foi possível carregar a compra</h2><p>Confira sua conexão e tente novamente. Entre na sua conta para acessar este checkout.</p><Actions><Button onClick={()=>checkout.refetch()} disabled={checkout.isFetching}>Tentar novamente</Button><Back to="/cart">Voltar ao carrinho</Back></Actions></Result>:<Layout><Stack>
            {hasPayment?<Result role="status">{approved?<FiCheckCircle/>:['rejected','cancelled','refunded'].includes(state)?<FiXCircle style={{color:'#ae4f63'}}/>:<FiClock/>}<h2>{detail.payment_method==='pix'&&!approved?'Esta compra já possui um Pix':message.title}</h2><p>{detail.payment_method==='pix'&&!approved?'Acompanhe o pagamento Pix que já foi gerado para esta compra.':message.description}</p>
                {uncertain&&<ErrorBox>Não recebemos a confirmação da solicitação. Consulte o status antes de iniciar outra compra.</ErrorBox>}
                {status.isError&&<ErrorBox role="alert">Não foi possível consultar o pagamento. Tente atualizar o status em instantes.</ErrorBox>}
                <Actions>{detail.payment_method==='pix'&&!approved?<Action to={`/payment/pix/${id}`}>Acompanhar Pix</Action>:<><Action to="/profile/orders">Ver minhas compras</Action>{!approved&&<Button disabled={status.isFetching} onClick={()=>status.refetch()}><FiRefreshCw/>{status.isFetching?'Consultando…':'Atualizar status'}</Button>}</>}</Actions>
                {['rejected','cancelled'].includes(state)&&<Back to="/cart">Voltar ao carrinho</Back>}
            </Result>:blocked?<Result role="alert"><FiClock/><h2>{expired?'Esta compra expirou':detail.status==='cancelled'?'Compra cancelada':'Revise os dados da compra'}</h2><p>{expired?'Volte ao carrinho para conferir os produtos e iniciar um novo checkout.':'Confira o endereço e os dados do checkout antes de pagar.'}</p><Action to={expired?'/cart':`/payment/checkout/${id}`}>Revisar compra</Action></Result>:<Panel><h2><FiCreditCard/>Dados do cartão</h2><Intro>Pagamento à vista em 1x de <strong>{money(detail.total)}</strong></Intro>
                {mutation.isPending?<Result role="status" aria-live="polite"><FiClock/><h2>Enviando seu pagamento…</h2><p>Aguarde o retorno. Mantenha esta página aberta.</p></Result>:null}<div style={{display:mutation.isPending?'none':undefined}}><CardForm checkoutId={id} amount={Number(detail.total)} onPay={pay}/></div>
                <Secure><FiLock/><span>Os dados do cartão são preenchidos no formulário protegido do Mercado Pago.</span></Secure>
            </Panel>}
            <CheckoutProducts products={detail.products}/>
        </Stack><Stack><Panel><h2>Resumo da compra</h2><Totals><div><span>Produtos</span><span>{money(detail.subtotal)}</span></div>{Number(detail.discount)>0&&<div><span>Desconto</span><span>− {money(detail.discount)}</span></div>}<div className="total"><strong>Total a pagar</strong><strong>{money(detail.total)}</strong></div></Totals><StatusText><FiCreditCard/> Cartão · pagamento à vista</StatusText><Reference><span>Referência da compra</span><strong>#{id.slice(-8).toUpperCase()}</strong></Reference></Panel>
            {detail.address&&<Panel><h2><FiMapPin/>Endereço de entrega</h2><Address><strong>{detail.address.label}</strong><span>{detail.address.street}, {detail.address.number}</span>{detail.address.complement&&<span>{detail.address.complement}</span>}<span>{detail.address.district} · {detail.address.city}</span><span>CEP {detail.address.postal_code}</span></Address></Panel>}
        </Stack></Layout>}
    </DefaultTemplate>;
}
const Intro=styled.p`font-size:13px;color:#7891a2;line-height:1.8;margin:0 0 22px;strong{color:#365c74;}`;
const Secure=styled.div`display:flex;align-items:center;gap:10px;border-top:1px solid #edf2f5;padding-top:18px;margin-top:20px;color:#7d96a5;font-size:11px;line-height:1.8;svg{flex-shrink:0;color:#348eaf;font-size:18px;}`;
const Totals=styled.div`display:flex;flex-direction:column;gap:16px;font-size:13px;color:#7891a2;>div{display:flex;justify-content:space-between;gap:16px;}.total{border-top:1px solid #e8eff3;padding-top:18px;color:#315b73;strong:last-child{font-size:23px;color:#008ecc;}}`;
const Address=styled.div`display:flex;flex-direction:column;gap:7px;font-size:12px;line-height:1.7;color:#7891a2;strong{color:#4c7086;}`;
