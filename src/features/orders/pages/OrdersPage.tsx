import {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {FiArrowRight,FiCheckCircle,FiClock,FiRefreshCw,FiShoppingBag} from 'react-icons/fi';
import {useOrders} from '../hooks/useOrders';
import {orderDate,orderFilter,orderPage,orderStatus,paymentLink} from '../utils/orders';
import {OrderProducts} from '../components/OrderProducts';
import {OrderDetails} from '../components/OrderDetails';
import {Action,Badge,Card,CardFooter,CardHeader,Empty,Filter,Filters,Header,Pagination} from '../components/orders.styles';
import {Button,Feedback} from '../../profile/components/profile.styles';
import {money} from '../../cart/utils/cartTotals';
import {Skeleton} from '../../../Components/UI/Skeleton/Skeleton';
import type {OrderFilter} from '../types';
const filters:{value:OrderFilter;label:string}[]=[{value:'all',label:'Todas'},{value:'pending',label:'Pendentes'},{value:'paid',label:'Pagas'},{value:'closed',label:'Encerradas'}];
export default function OrdersPage() {
    const [params,setParams]=useSearchParams();
    const page=orderPage(params.get('page'));const filter=orderFilter(params.get('status'));
    const query=useOrders(page,filter);
    const data=query.data?.data;
    const [selected,setSelected]=useState<string|null>(null);
    function navigate(nextPage:number,nextFilter:OrderFilter=filter) {const next=new URLSearchParams(params);if(nextPage>1)next.set('page',String(nextPage));else next.delete('page');if(nextFilter!=='all')next.set('status',nextFilter);else next.delete('status');setParams(next);}
    return <><Header><div><h2>Minhas compras</h2><p>Confira suas compras e acompanhe os pagamentos iniciados.</p></div><Button type="button" onClick={()=>query.refetch()} disabled={query.isFetching}><FiRefreshCw/>{query.isFetching?'Atualizando…':'Atualizar'}</Button></Header>
        <Filters role="group" aria-label="Filtrar compras">{filters.map(item=><Filter key={item.value} $active={filter===item.value} aria-pressed={filter===item.value} onClick={()=>navigate(1,item.value)}>{item.label}</Filter>)}</Filters>
        {query.isLoading?<div aria-busy="true" aria-label="Carregando compras"><Skeleton height="250px"/><Skeleton height="250px"/></div>:!data?<Empty role="alert"><FiShoppingBag/><h3>Não foi possível carregar suas compras</h3><p>Confira sua conexão e tente novamente.</p><Button disabled={query.isFetching} onClick={()=>query.refetch()}>Tentar novamente</Button></Empty>:<>
            {query.isError&&<Feedback role="alert" $error>Não foi possível atualizar a lista. Os dados abaixo são da última consulta.</Feedback>}
            {data.orders.length===0?<Empty><FiShoppingBag/><h3>{page>1?'Nenhuma compra nesta página':filter==='all'?'Suas próximas descobertas começam aqui':'Nenhuma compra neste filtro'}</h3><p>{filter==='all'&&page===1?'Quando iniciar uma compra, os produtos e o pagamento aparecerão aqui.':'Escolha outro filtro ou volte para a primeira página.'}</p>{page>1||filter!=='all'?<Button onClick={()=>navigate(1,'all')}>Ver todas as compras</Button>:<Action to="/search">Explorar produtos <FiArrowRight/></Action>}</Empty>:data.orders.map(order=>{const status=orderStatus(order);const link=paymentLink(order);return <Card key={order.checkoutId}><CardHeader><div><h3>Compra #{order.checkoutId.slice(-8).toUpperCase()}</h3><p>{orderDate(order.created_at)} · {order.products.reduce((sum,item)=>sum+item.quantity,0)} unidades</p></div><Badge $status={status.key}>{status.key==='paid'?<FiCheckCircle/>:<FiClock/>}{status.label}</Badge></CardHeader><OrderProducts items={order.products.slice(0,2)}/>{order.products.length>2&&<small style={{color:'#8299a8',fontSize:11}}>+ {order.products.length-2} {order.products.length-2===1?'outro item':'outros itens'} nesta compra</small>}<CardFooter><div><small>Total da compra</small><strong>{money(order.total)}</strong></div><div><Button onClick={()=>setSelected(order.checkoutId)} aria-label={`Ver detalhes da compra ${order.checkoutId.slice(-8).toUpperCase()}`}>Ver detalhes</Button>{status.key==='pending'&&link&&<Action to={link}>{order.payment_id?'Ver pagamento':'Continuar compra'}<FiArrowRight/></Action>}</div></CardFooter></Card>;})}
            {data.pagination.totalPages>1&&<Pagination aria-label="Páginas de compras"><Button disabled={page<=1} onClick={()=>navigate(page-1)}>Anterior</Button><span>Página {page} de {data.pagination.totalPages}</span><Button disabled={page>=data.pagination.totalPages} onClick={()=>navigate(page+1)}>Próxima</Button></Pagination>}
        </>}
        {selected&&<OrderDetails key={selected} id={selected} onClose={()=>setSelected(null)}/>}
    </>;
}
