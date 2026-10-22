import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FiArrowLeft, FiArrowRight, FiChevronRight } from "react-icons/fi";
import { DefaultTemplate } from "../../../Template/DefaultTemplate";
import { ScrollToTop } from "../../../Components/UI/ScrollToTop";
import { Skeleton } from "../../../Components/UI/Skeleton/Skeleton";
import { useAuth } from "../../auth/model/authStore";
import { usePixGenerate } from "../../../service/PaymentService";
import { useGetCheckout } from "../hooks/useCheckout";
import { checkoutError, checkoutState } from "../utils/checkoutValidation";
import { money } from "../../cart/utils/cartTotals";
import type { PaymentMethod } from "../types";
import { AddressSection } from "../components/AddressSection";
import { CheckoutProducts } from "../components/CheckoutProducts";
import { PaymentSection } from "../components/PaymentSection";
import { Back, Breadcrumb, Empty, ErrorBox, Heading, Layout, Notice, Primary, Secondary, Stack, Steps, Summary, Total } from "../components/checkout.styles";
export default function CheckoutPage() {const {checkoutId} = useParams();return <CheckoutContent key={checkoutId} checkoutId={checkoutId ?? ""} />;}
function CheckoutContent({checkoutId}:{checkoutId:string}) {
    const query = useGetCheckout(checkoutId);
    const user = useAuth(state=>state.user);
    const navigate = useNavigate();
    const client = useQueryClient();
    const pix = usePixGenerate();
    const sending = useRef(false);
    const [method,setMethod] = useState<PaymentMethod>("");
    const [addressBusy,setAddressBusy] = useState(false);
    const [error,setError] = useState("");
    const [now,setNow] = useState(Date.now);
    useEffect(()=>{const timer=setInterval(()=>setNow(Date.now()),1000);return ()=>clearInterval(timer);},[]);
    const checkout = query.data;
    const state = checkout ? checkoutState(checkout,now) : "ready";
    const busy = addressBusy || pix.isPending;
    const ready = !!checkout?.address && !!method && !!checkout?.products.length && state === "ready" && !busy;
    function proceed() {
        if (!checkout || !ready || sending.current || checkoutState(checkout) !== "ready") return;
        setError("");
        if (method === "CARTAO") {navigate(`/payment/card/${checkoutId}`);return;}
        sending.current = true;
        pix.mutate(checkoutId,{onSuccess:()=>navigate(`/payment/pix/${checkoutId}`),onError:failure=>{setError(checkoutError(failure));void client.invalidateQueries({queryKey:["checkout",checkoutId]});},onSettled:()=>{sending.current=false;}});
    }
    const actionLabel = pix.isPending ? "Preparando Pix…" : method === "PIX" ? "Continuar com Pix" : method === "CARTAO" ? "Continuar com cartão" : "Escolha como pagar";
    return <DefaultTemplate><ScrollToTop /><Breadcrumb aria-label="Navegação do checkout"><Link to="/">Início</Link><FiChevronRight /><Link to="/cart">Carrinho</Link><FiChevronRight /><span>Checkout</span></Breadcrumb>
        <Heading><div><small>FALTA POUCO PARA A SUA PRÓXIMA DESCOBERTA</small><h1>Revise sua compra</h1><p>Confira os produtos, o endereço e a forma de pagamento.</p></div><Back to="/cart"><FiArrowLeft />Voltar ao carrinho</Back></Heading>
        <Steps aria-label="Etapas da compra"><li><span>1</span>Carrinho</li><li aria-current="step"><span>2</span>Revisão</li><li><span>3</span>Pagamento</li></Steps>
        {query.isLoading ? <Layout aria-busy="true" aria-label="Carregando checkout"><Stack><Skeleton height="180px"/><Skeleton height="230px"/></Stack><Skeleton height="300px"/></Layout> : query.isError || !checkout ? <Empty role="alert"><h2>Não foi possível carregar esta compra</h2><p>{checkoutError(query.error)}</p><Secondary type="button" disabled={query.isFetching} onClick={()=>query.refetch()}>Tentar novamente</Secondary><Back to="/cart">Voltar ao carrinho</Back></Empty> : !checkout.products.length ? <Empty><h2>Esta compra está sem produtos</h2><p>Volte ao carrinho para selecionar os itens que deseja levar.</p><Back to="/cart">Ir para o carrinho</Back></Empty> : <>
            {state !== "ready" && <Notice role="status">{state === "paid" ? <>Esta compra já foi paga. <Link to="/profile/orders">Acompanhar minhas compras</Link></> : state === "expired" ? <>Esta compra expirou. <Link to="/cart">Volte ao carrinho para iniciar uma nova revisão.</Link></> : state === "cancelled" ? <>Esta compra foi cancelada. <Link to="/cart">Voltar ao carrinho</Link></> : <>Já existe um pagamento em andamento para esta compra.</>}</Notice>}
            <Layout><Stack><CheckoutProducts products={checkout.products}/><AddressSection checkoutId={checkoutId} address={checkout.address} editable={state === "ready" && !pix.isPending} onBusy={setAddressBusy}/><PaymentSection value={method} onChange={value=>{setMethod(value);setError("");}} disabled={state !== "ready" || busy} cpf={user?.cpf ?? ""}/></Stack>
                <Summary><h2>Resumo da compra</h2><dl><div><dt>Subtotal dos produtos</dt><dd>{money(checkout.subtotal)}</dd></div>{checkout.discount > 0 && <div><dt>Descontos</dt><dd>− {money(checkout.discount)}</dd></div>}</dl><Total><span>Total dos produtos</span><strong>{money(checkout.total)}</strong></Total>
                    {state === "processing" && checkout.payment_method === "pix" ? <Primary type="button" onClick={()=>navigate(`/payment/pix/${checkoutId}`)}>Ver pagamento Pix <FiArrowRight /></Primary> : state === "ready" ? <Primary type="button" disabled={!ready} onClick={proceed}>{actionLabel}<FiArrowRight /></Primary> : <Back to={state === "expired" || state === "cancelled" ? "/cart" : "/profile/orders"}>{state === "expired" || state === "cancelled" ? "Voltar ao carrinho" : "Acompanhar minhas compras"}</Back>}
                    {state === "ready" && !checkout.address && <p>Selecione um endereço para continuar.</p>}{state === "ready" && checkout.address && !method && <p>Escolha Pix ou cartão para a próxima etapa.</p>}<p>Entrega não incluída neste total. Confira os dados antes de continuar.</p>{state === "ready" && checkout.expires_at && <p>Revisão válida até {new Date(checkout.expires_at).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}.</p>}{error && <ErrorBox role="alert">{error}</ErrorBox>}
                </Summary>
            </Layout>
        </>}
    </DefaultTemplate>;
}
