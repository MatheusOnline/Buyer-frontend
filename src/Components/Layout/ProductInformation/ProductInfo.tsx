import { useState } from "react";
import styled from "styled-components";
import { FiCheck, FiMinus, FiPlus, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import type { ProductInformationProps, ProductVariation } from "../../../types/types";
import { useAuth } from "../../../stores/useAuthStore";
import { useAddItemToCart } from "../../../service/cartService";
import { cartError } from "../../../features/cart/utils/cartTotals";
import { useCreateCheckoutDirect } from "../../../service/checkoutService";

const money = (value: number) => value.toLocaleString("pt-BR", {style:"currency",currency:"BRL"});
export const ProductInfo = ({product, isLoading, selectedSku, onSelectSku}: {product: ProductInformationProps; isLoading:boolean; selectedSku?:ProductVariation; onSelectSku:(id:string)=>void}) => {
    const [quantity, setQuantity] = useState(1);
    const user = useAuth(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const cart = useAddItemToCart();
    const checkout = useCreateCheckoutDirect();
    if (isLoading) return <Panel aria-busy="true"><Loading /><Loading /><Loading /></Panel>;
    const variations = product.skus ?? [];
    const hasChoices = variations.length > 1;
    const activeSku = selectedSku ?? (!hasChoices ? variations[0] : undefined);
    const needsSelection = hasChoices && !activeSku;
    const stock = Math.max(0, activeSku?.stock ?? product.available_stock ?? product.stock ?? 0);
    const original = Number(activeSku?.price ?? product.original_price);
    const offer = Number(activeSku ? activeSku.current_price : product.current_price);
    const onSale = offer > 0 && offer < original;
    const price = onSale ? offer : original;
    const promotion = activeSku ? activeSku.promotion : product.promotion;
    const busy = cart.isPending || checkout.isPending;
    function purchase(direct:boolean) {
        if (needsSelection || !stock) return;
        if (!user) {navigate("/auth/login",{state:{from:location.pathname + location.search}});return;}
        if (direct) checkout.mutate({product_id:product.id,quantity:Math.min(quantity,stock),sku_id:activeSku?.id}, {onSuccess: data => {
            const checkoutId = data?.data?.checkoutId;
            if (checkoutId) navigate(`/payment/checkout/${checkoutId}`);
        }});
        else cart.mutate({product_id:product.id,sku_id:activeSku?.id,quantity:Math.min(quantity,stock)});
    }
    return <Panel>
        <Eyebrow>DO COMÉRCIO LOCAL PARA VOCÊ</Eyebrow>
        <Code>Cód. {product.code}</Code>
        <Title>{product.title}</Title>
        {product.brand && <Muted>Marca: {product.brand}</Muted>}
        {hasChoices && <Variations><legend>Escolha uma opção{activeSku ? `: ${activeSku.variation_value || activeSku.sku}` : ""}</legend><Options>{variations.map(sku => <Option type="button" key={sku.id} $selected={sku.id === activeSku?.id} aria-pressed={sku.id === activeSku?.id} disabled={sku.stock <= 0 || busy} onClick={() => {onSelectSku(sku.id);setQuantity(1);cart.reset();checkout.reset();}}>{sku.image_url && <img src={sku.image_url} alt="" />}<span>{sku.variation_value || sku.sku}{sku.stock <= 0 && <small>Esgotado</small>}</span></Option>)}</Options>{needsSelection && <Muted>Selecione a variação desejada para ver o preço e a disponibilidade.</Muted>}</Variations>}
        <Stock $available={stock > 0}><FiCheck />{stock > 0 ? "Disponível em estoque" : "Produto indisponível"}</Stock>
        <PriceBlock>{onSale && <Offer title={promotion?.name}>{promotion?.name ?? "Oferta especial"} · {Math.round((1 - price / original) * 100)}% OFF</Offer>}
            {!activeSku && product.from_price && <Muted>A partir de</Muted>}
            {onSale && <OldPrice>{money(original)}</OldPrice>}
            <Price>{money(price)}</Price>
        </PriceBlock>
        <Controls><span>Quantidade</span><Counter><button type="button" aria-label="Diminuir quantidade" disabled={quantity <= 1 || busy} onClick={() => setQuantity(value => value - 1)}><FiMinus /></button><output aria-live="polite">{Math.min(quantity,stock || 1)}</output><button type="button" aria-label="Aumentar quantidade" disabled={quantity >= stock || busy} onClick={() => setQuantity(value => value + 1)}><FiPlus /></button></Counter></Controls>
        <Primary type="button" disabled={!stock || busy || needsSelection} onClick={() => purchase(true)}>{checkout.isPending ? "Preparando compra…" : "Comprar agora"}</Primary>
        <Secondary type="button" disabled={!stock || busy || needsSelection} onClick={() => purchase(false)}><FiShoppingCart />{cart.isPending ? "Adicionando…" : "Adicionar ao carrinho"}</Secondary>
        <Feedback role="status">{cart.isSuccess ? "Produto adicionado ao carrinho." : ""}</Feedback>
        {(cart.isError || checkout.isError) && <Error role="alert">{cartError(cart.error ?? checkout.error)}</Error>}
        <Store><StoreIcon><FiShoppingBag /></StoreIcon><div><Muted>Vendido por</Muted><strong>{product.store || "Loja local"}</strong></div></Store>
    </Panel>;
};
const Panel = styled.section`min-width:0;background:white;border:1px solid #e9eef2;border-radius:8px;padding:30px;display:flex;flex-direction:column;align-self:start;@media(max-width:700px){padding:22px;}`;
const Eyebrow = styled.p`font-size:10px;letter-spacing:1.5px;font-weight:700;color:#668595;margin:0 0 14px;`;
const Code = styled.p`font-size:12px;color:#83919b;margin:0 0 10px;`;
const Title = styled.h1`font-size:28px;line-height:1.3;letter-spacing:-.7px;color:#243c4a;margin:0 0 12px;font-weight:650;@media(max-width:700px){font-size:24px;}`;
const Muted = styled.p`font-size:13px;color:#7a8993;margin:0 0 5px;`;
const Stock = styled.p<{$available:boolean}>`display:flex;align-items:center;gap:6px;color:${({$available})=>$available?'#258164':'#8b5960'};font-size:12px;margin:16px 0 0;`;
const PriceBlock = styled.div`margin:24px 0;padding:22px 0;border-top:1px solid #eef1f4;border-bottom:1px solid #eef1f4;`;
const Offer = styled.span`display:inline-block;border-radius:6px;background:#e5f8ff;color:#137c9f;font-size:12px;font-weight:600;padding:6px 9px;margin-bottom:12px;`;
const OldPrice = styled.del`display:block;color:#91a0aa;font-size:15px;margin-bottom:4px;`;
const Price = styled.strong`display:block;color:#203a49;font-size:36px;letter-spacing:-1px;@media(max-width:700px){font-size:32px;}`;
const Controls = styled.div`display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#526775;margin-bottom:18px;`;
const Counter = styled.div`display:flex;align-items:center;border:1px solid #dce6eb;border-radius:6px;overflow:hidden;output{min-width:36px;text-align:center;font-weight:600;}button{border:0;background:white;width:36px;height:38px;display:grid;place-items:center;cursor:pointer;color:#257c9e;}button:disabled{color:#c3cbd0;cursor:default;}`;
const Primary = styled.button`width:100%;min-height:48px;border:1px solid #36c5fa;border-radius:6px;background:#36c5fa;color:#103b4e;font-weight:650;font-size:15px;cursor:pointer;&:hover:not(:disabled){background:#20b9ef;} &:disabled{opacity:.5;cursor:default;}&:focus-visible{outline:3px solid #167594;outline-offset:3px;}`;
const Secondary = styled(Primary)`display:flex;gap:9px;align-items:center;justify-content:center;margin-top:10px;background:white;color:#167da3;&:hover:not(:disabled){background:#edfaff;}`;
const Feedback = styled.p`font-size:12px;color:#258164;margin:8px 0;:empty{display:none;}`;
const Error = styled.p`font-size:13px;color:#aa3948;`;
const Store = styled.div`display:flex;gap:12px;align-items:center;border-top:1px solid #eef1f4;padding-top:22px;margin-top:24px;strong{font-size:14px;color:#334f60;}`;
const StoreIcon = styled.div`display:grid;place-items:center;width:42px;height:42px;border-radius:6px;background:#eff8fb;color:#3287a6;font-size:22px;`;
const Loading = styled.div`height:90px;background:#f1f5f7;border-radius:6px;margin-bottom:20px;`;

const Variations = styled.fieldset`border:0;padding:0;margin:20px 0 0;min-width:0;legend{font-size:13px;font-weight:600;color:#405e6f;margin-bottom:12px;}p{margin-top:10px;}`;
const Options = styled.div`display:flex;flex-wrap:wrap;gap:8px;`;
const Option = styled.button<{$selected:boolean}>`display:flex;gap:8px;align-items:center;max-width:100%;padding:8px 12px;border:2px solid ${({$selected})=>$selected?'#36c5fa':'#e2eaf0'};border-radius:6px;background:${({$selected})=>$selected?'#effaff':'white'};color:#395665;font-size:13px;cursor:pointer;img{width:32px;height:32px;object-fit:contain;}span{overflow-wrap:anywhere;text-align:left;}small{display:block;color:#8e9ca6;margin-top:4px;}&:disabled{opacity:.45;cursor:default;}&:focus-visible{outline:3px solid #167594;outline-offset:2px;}`;
