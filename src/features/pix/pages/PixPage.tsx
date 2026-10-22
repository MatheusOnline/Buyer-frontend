import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiChevronRight, FiClock, FiRefreshCw, FiXCircle } from "react-icons/fi";
import { DefaultTemplate } from "../../../Template/DefaultTemplate";
import { ScrollToTop } from "../../../Components/UI/ScrollToTop";
import { Skeleton } from "../../../Components/UI/Skeleton/Skeleton";
import { usePixPayment } from "../hooks/usePixPayment";
import { pixError, pixMessages, pixState } from "../utils/pixPayment";
import { PixCode } from "../components/PixCode";
import { Action, Actions, Back, Breadcrumb, Button, ErrorBox, Heading, Instructions, Layout, Panel, Reference, Result, Stack, Status, StatusText } from "../components/pix.styles";
export default function PixPage() {const {checkoutId}=useParams();return <PixContent key={checkoutId} checkoutId={checkoutId??""}/>;}
function PixContent({checkoutId}:{checkoutId:string}) {
    const query=usePixPayment(checkoutId);
    const client=useQueryClient();
    const [now,setNow]=useState(Date.now);
    const refreshed=useRef(false);
    const payment=query.data?.data;
    const state=payment ? pixState(payment,now) : "unavailable";
    const message=payment?.order_pending&&state==='approved'?{title:'Pagamento aprovado, preparando seu pedido',description:'Seu Pix foi confirmado. Estamos registrando o pedido para a loja; aguarde a atualização automática.'}:pixMessages[state];
    useEffect(()=>{const timer=setInterval(()=>setNow(Date.now()),1000);return ()=>clearInterval(timer);},[]);
    useEffect(()=>{
        if(state!=="approved" || payment?.order_pending || refreshed.current)return;
        refreshed.current=true;
        for(const key of ["cart","checkout","orders"])void client.invalidateQueries({queryKey:[key]});
    },[state,client,payment?.order_pending]);
    return <DefaultTemplate><ScrollToTop/><Breadcrumb aria-label="Navegação do pagamento"><Link to="/">Início</Link><FiChevronRight/><Link to="/cart">Carrinho</Link><FiChevronRight/><span>Pagamento Pix</span></Breadcrumb>
        <Heading><div><small>ÚLTIMA ETAPA DA SUA COMPRA</small><h1>{state === "approved" && payment ? "Seu pagamento foi confirmado" : "Pagamento com Pix"}</h1><p>Confira o valor e acompanhe a confirmação por aqui.</p></div><Back to={`/payment/checkout/${checkoutId}`}><FiArrowLeft/>Voltar ao checkout</Back></Heading>
        {query.isLoading ? <Layout aria-busy="true" aria-label="Carregando pagamento Pix"><Skeleton height="540px"/><Skeleton height="340px"/></Layout> : !payment ? <Result role="alert"><FiXCircle/><h2>Não foi possível carregar o Pix</h2><p>{pixError(query.error)}</p><Actions><Button type="button" disabled={query.isFetching} onClick={()=>query.refetch()}>{query.isFetching ? "Consultando…" : "Tentar novamente"}</Button><Back to={`/payment/checkout/${checkoutId}`}>Revisar checkout</Back></Actions></Result> : <Layout>
            <Stack>{state === "pending" ? <PixCode payment={payment} now={now}/> : <Result role="status">{state === "approved" ? <FiCheckCircle/> : state === "processing" ? <FiClock/> : <FiXCircle/>}<h2>{message.title}</h2><p>{message.description}</p><Actions>{state === "approved" || state === "refunded" ? <Action to="/profile/orders">Ver minhas compras <FiArrowRight/></Action> : state === "unsupported" || state === "unavailable" ? <Action to={`/payment/checkout/${checkoutId}`}>Revisar checkout</Action> : state !== "processing" && <Action to="/cart">Voltar ao carrinho</Action>}</Actions></Result>}
                {query.isError && <ErrorBox role="alert">{pixError(query.error)} Se já pagou, consulte novamente antes de repetir o pagamento.</ErrorBox>}
            </Stack>
            <Stack><Panel><h2>Status do pagamento</h2><Status $success={state === "approved"}>{state === "approved" ? <FiCheckCircle/> : <FiClock/>}{message.title}</Status><StatusText>{message.description}</StatusText><Button type="button" disabled={query.isFetching} onClick={()=>query.refetch()}><FiRefreshCw/>{query.isFetching ? "Verificando…" : state === "pending" ? "Já paguei, verificar status" : "Atualizar status"}</Button><Reference><span>Referência da compra</span><strong>#{checkoutId.slice(-8).toUpperCase()}</strong></Reference></Panel>
                {state === "pending" && <Panel><h2>Como pagar</h2><Instructions><li><span>1</span><div>Abra o aplicativo do seu banco e entre na área <strong>Pix</strong>.</div></li><li><span>2</span><div>Escaneie o QR Code ou escolha <strong>Pix Copia e Cola</strong>.</div></li><li><span>3</span><div>Confira o valor e o recebedor no banco antes de confirmar.</div></li><li><span>4</span><div>Depois de pagar, volte para acompanhar a confirmação.</div></li></Instructions></Panel>}
            </Stack>
        </Layout>}
    </DefaultTemplate>;
}
