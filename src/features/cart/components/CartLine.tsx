import { useState } from "react";
import { FiImage, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import type { CartItem } from "../types";
import { useCartBusy, useDecreaseItemToCart, useIncreaseItemToCart, useRemoveItemToCart } from "../hooks/useCart";
import { cartError, money } from "../utils/cartTotals";
import { Badge, Bottom, Counter, Error, Info, Item, Picture, PriceRow, Remove } from "./cart.styles";
import { Link } from "react-router-dom";
export function CartLine({item,checked,onToggle}:{item:CartItem;checked:boolean;onToggle:()=>void}) {
    const [failed,setFailed] = useState(false);
    const increase = useIncreaseItemToCart();
    const decrease = useDecreaseItemToCart();
    const remove = useRemoveItemToCart();
    const busy = useCartBusy();
    const url = `/product/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g,"-"))}/${item.product_id}`;
    const error = increase.error ?? decrease.error ?? remove.error;
    const sale = item.price > 0 && item.price < item.original_price;
    return <Item><input type="checkbox" aria-label={`Selecionar ${item.title}${item.variation ? `, ${item.variation}` : ""}`} checked={checked} disabled={!item.available || busy} onChange={onToggle} />
        <Picture to={url} aria-label={`Ver ${item.title}`}>{item.image && !failed ? <img src={item.image} alt={item.title} onError={()=>setFailed(true)} /> : <FiImage size={30} />}</Picture>
        <Info><p>Vendido por {item.store}</p><h2><Link to={url}>{item.title}</Link></h2>{item.variation && <p>Opção: {item.variation}</p>}
            <PriceRow>{sale && <del>{money(item.original_price)}</del>}<strong>{item.price > 0 ? money(item.price) : "Indisponível"}</strong><span style={{fontSize:10,color:'#889ca9'}}>/ unidade</span>{sale && <Badge title={item.promotion?.name}>{item.promotion?.name ?? "Em promoção"}</Badge>}</PriceRow>
            {!item.available && <Error>{item.reason}</Error>}
            <Bottom><Counter><button type="button" aria-label={`Diminuir quantidade de ${item.title}`} disabled={busy || item.quantity <= 1} onClick={()=>decrease.mutate(item.id)}><FiMinus /></button><output aria-live="polite">{item.quantity}</output><button type="button" aria-label={`Aumentar quantidade de ${item.title}`} disabled={busy || !item.sku_id || item.quantity >= item.available_stock || item.quantity >= 9999} onClick={()=>increase.mutate(item.id)}><FiPlus /></button></Counter><strong>{item.price > 0 ? money(item.line_total) : "—"}</strong><Remove type="button" disabled={busy} onClick={()=>remove.mutate(item.id)} aria-label={`Remover ${item.title} do carrinho`}><FiTrash2 />{remove.isPending ? "Removendo…" : "Remover"}</Remove></Bottom>
            {error && <Error role="alert">{cartError(error)}</Error>}
        </Info>
    </Item>;
}
