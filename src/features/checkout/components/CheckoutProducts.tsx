import { useState } from "react";
import { FiImage, FiShoppingBag } from "react-icons/fi";
import type { CheckoutDetail } from "../types";
import { money } from "../../cart/utils/cartTotals";
import { Panel, Product, Products, SectionHead } from "./checkout.styles";
function ProductLine({item}:{item:CheckoutDetail["products"][number]}) {
    const [failed,setFailed] = useState(false);
    return <Product><figure>{item.image && !failed ? <img src={item.image} alt={item.name} onError={()=>setFailed(true)} /> : <FiImage size={28} />}</figure><div><h3>{item.name}</h3><p>Quantidade: {item.quantity} · {money(item.price)} por unidade</p></div><strong>{money(Math.round(item.price*100)*item.quantity/100)}</strong></Product>;
}
export function CheckoutProducts({products}:{products:CheckoutDetail["products"]}) {
    return <Panel aria-labelledby="checkout-products-title"><SectionHead><h2 id="checkout-products-title"><FiShoppingBag />Seus produtos</h2><span>{products.reduce((sum,item)=>sum+item.quantity,0)} unidades</span></SectionHead><Products>{products.map(item=><ProductLine item={item} key={item.id} />)}</Products></Panel>;
}
