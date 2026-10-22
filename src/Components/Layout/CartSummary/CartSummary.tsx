import styled from "styled-components";
import { money } from "../../../features/cart/utils/cartTotals";
import { Skeleton } from "../../UI/Skeleton/Skeleton";
type Props = {isLoading:boolean;isEnabled?:boolean;onConfirm?:()=>void;redirect?:()=>void;subtotal:number;total:number;discount?:number};
export const CartSummary = ({isLoading,isEnabled,onConfirm,subtotal,total,discount}:Props) => {
    if (isLoading) return <Box><Skeleton height="250px" /></Box>;
    const saving = discount ?? Math.max(0,subtotal-total);
    return <Box><h2>Resumo do pedido</h2><dl><div><dt>Subtotal dos produtos</dt><dd>{money(Number(subtotal))}</dd></div>{saving > 0 && <div><dt>Descontos</dt><dd>− {money(Number(saving))}</dd></div>}</dl><Total><span>Total dos produtos</span><strong>{money(Number(total))}</strong></Total><button type="button" disabled={isEnabled} onClick={onConfirm}>Finalizar compra</button><p>Confira os itens e o endereço antes de prosseguir.</p></Box>;
};
const Box = styled.aside`background:white;border:1px solid #e5ecf0;border-radius:8px;padding:24px;min-width:0;width:100%;align-self:start;h2{font-size:19px;color:#2e4c5d;margin:0 0 24px;}dl{margin:0;display:flex;flex-direction:column;gap:16px;font-size:13px;color:#748b99;}dl>div{display:flex;gap:12px;justify-content:space-between;}dd{margin:0;color:#34586d;}button{width:100%;min-height:46px;border:0;border-radius:6px;background:#008ecc;color:white;font-size:13px;font-weight:600;cursor:pointer;}button:disabled{opacity:.45;cursor:default;}p{font-size:11px;line-height:1.7;color:#8b9da7;margin-top:12px;}`;
const Total = styled.div`display:flex;justify-content:space-between;gap:12px;border-top:1px solid #e9eff3;margin:22px 0 18px;padding-top:20px;color:#31576c;font-size:13px;strong{font-size:22px;}`;
