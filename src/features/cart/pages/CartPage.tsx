import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiChevronRight, FiShoppingBag } from "react-icons/fi";
import { DefaultTemplate } from "../../../Template/DefaultTemplate";
import { ScrollToTop } from "../../../Components/UI/ScrollToTop";
import { Skeleton } from "../../../Components/UI/Skeleton/Skeleton";
import { useCartBusy, useGetCart } from "../hooks/useCart";
import { useCreateCheckoutCart } from "../../../service/checkoutService";
import { cartError, cartTotals, money } from "../utils/cartTotals";
import { CartLine } from "../components/CartLine";
import { Back, Breadcrumb, Error, Heading, Layout, List, Primary, State, Summary, Toolbar, Total } from "../components/cart.styles";
export default function CartPage() {
    const query = useGetCart();
    const [excluded,setExcluded] = useState<string[]>([]);
    const checkout = useCreateCheckoutCart();
    const navigate = useNavigate();
    const busy = useCartBusy() || checkout.isPending;
    const items = query.data?.data ?? [];
    const eligible = items.filter(item=>item.available);
    const selected = eligible.filter(item=>!excluded.includes(item.id));
    const totals = cartTotals(selected);
    function confirm() {
        if (!selected.length || busy) return;
        checkout.mutate({cart_item_ids:selected.map(item=>item.id)},{onSuccess:response=>{const id=response?.data?.checkoutId;if(id) navigate(`/payment/checkout/${id}`);},onError:()=>{void query.refetch();}});
    }
    return <DefaultTemplate><ScrollToTop />
        <Breadcrumb aria-label="Navegação do carrinho"><Link to="/">Início</Link><FiChevronRight /><span>Carrinho</span></Breadcrumb>
        <Heading><div><small>SUAS ESCOLHAS, BEM PERTO DE VOCÊ</small><h1>Meu carrinho</h1><p>Confira os produtos e escolha o que vai levar.</p></div><Back to="/search"><FiArrowLeft />Continuar comprando</Back></Heading>
        {query.isLoading ? <Layout aria-label="Carregando carrinho" aria-busy="true"><List><Skeleton height="180px"/><Skeleton height="180px"/></List><Skeleton height="300px"/></Layout> : query.isError ? <State role="alert"><FiShoppingBag /><h2>Não foi possível carregar seu carrinho</h2><p>Confira sua conexão e tente novamente.</p><Primary type="button" disabled={query.isFetching} onClick={()=>query.refetch()}>Tentar novamente</Primary></State> : !items.length ? <State><FiShoppingBag /><h2>Seu carrinho está esperando suas descobertas</h2><p>Explore os produtos do comércio local e adicione seus favoritos para continuar.</p><Link to="/search">Explorar produtos <FiArrowRight /></Link></State> : <Layout>
            <List><Toolbar><label><input type="checkbox" checked={eligible.length > 0 && selected.length === eligible.length} disabled={busy || !eligible.length} onChange={()=>setExcluded(selected.length === eligible.length ? eligible.map(item=>item.id) : [])} />Selecionar todos</label><span>{items.length} {items.length === 1 ? "produto" : "produtos"}</span></Toolbar>
            {items.map(item=><CartLine key={item.id} item={item} checked={item.available && !excluded.includes(item.id)} onToggle={()=>setExcluded(previous=>previous.includes(item.id) ? previous.filter(id=>id!==item.id) : [...previous,item.id])} />)}</List>
            <Summary><h2>Resumo da compra</h2><dl><div><dt>Produtos ({totals.quantity})</dt><dd>{money(totals.subtotal)}</dd></div>{totals.discount > 0 && <div><dt>Descontos</dt><dd>− {money(totals.discount)}</dd></div>}</dl><footer><Total><span>Total dos produtos</span><strong>{money(totals.total)}</strong></Total><Primary type="button" disabled={!selected.length || busy} onClick={confirm}>{checkout.isPending ? "Preparando compra…" : "Continuar para compra"}<FiArrowRight /></Primary><p>Selecione os produtos para continuar. Entrega não incluída neste total.</p>{checkout.isError && <Error role="alert">{cartError(checkout.error)}</Error>}</footer></Summary>
        </Layout>}
    </DefaultTemplate>;
}
