import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiCheck, FiX, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { subscribeCartFeedback, type CartFeedbackDetail } from "./cartFeedback";

export function CartFeedbackToast() {
    const [feedback,setFeedback]=useState<CartFeedbackDetail|null>(null);
    useEffect(()=>subscribeCartFeedback(detail=>setFeedback(detail)),[]);
    useEffect(()=>{
        if(!feedback)return;
        const timer=window.setTimeout(()=>setFeedback(null),2300);
        return ()=>window.clearTimeout(timer);
    },[feedback]);
    if(!feedback)return null;
    const success=feedback.status==="success";
    return <Layer aria-live="polite" aria-atomic="true">
        <Dialog role="status" $success={success}>
            <StatusIcon $success={success}>{success?<FiCheck aria-hidden="true"/>:<FiX aria-hidden="true"/>}</StatusIcon>
            <Message>{feedback.message}</Message>
            {feedback.productTitle&&<ProductTitle>{feedback.productTitle}</ProductTitle>}
            {success&&<CartLink to="/cart" onClick={()=>setFeedback(null)}><FiShoppingBag aria-hidden="true"/> Ver carrinho</CartLink>}
        </Dialog>
    </Layer>;
}

const Layer=styled.div`
    position:fixed;inset:0;z-index:2000;display:grid;place-items:center;padding:20px;
    background:rgba(20,32,40,.32);pointer-events:none;
    animation:fade-in .16s ease-out;
    @keyframes fade-in{from{opacity:0}to{opacity:1}}
`;
const Dialog=styled.div<{$success:boolean}>`
    width:min(340px,100%);min-height:174px;padding:25px 28px;border-radius:8px;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
    color:#fff;background:rgba(40,48,54,.88);box-shadow:0 16px 48px rgba(18,32,42,.24);text-align:center;
    animation:pop-in .2s ease-out;
    @keyframes pop-in{from{transform:scale(.94);opacity:.7}to{transform:scale(1);opacity:1}}
`;
const StatusIcon=styled.span<{$success:boolean}>`
    width:58px;height:58px;border-radius:50%;display:grid;place-items:center;
    background:${({$success})=>$success?"#08bfa7":"#d94b58"};color:white;
    svg{width:34px;height:34px;stroke-width:3}
`;
const Message=styled.strong`font-size:16px;font-weight:650;line-height:1.35;`;
const ProductTitle=styled.span`max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:rgba(255,255,255,.78);`;
const CartLink=styled(Link)`pointer-events:auto;display:inline-flex;align-items:center;gap:7px;margin-top:2px;color:#fff;font-size:12px;font-weight:600;text-decoration:underline;text-underline-offset:3px;`;
