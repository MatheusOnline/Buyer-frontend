import axios from "axios";
import type { CartItem } from "../types";
export const money = (value:number)=>value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
export function cartTotals(items:CartItem[]) {
    const selected = items.filter(item=>item.available);
    const original = selected.reduce((sum,item)=>sum+Math.round(item.original_price*100)*item.quantity,0);
    const total = selected.reduce((sum,item)=>sum+Math.round(item.price*100)*item.quantity,0);
    return {subtotal:original/100,discount:Math.max(0,original-total)/100,total:total/100,quantity:selected.reduce((sum,item)=>sum+item.quantity,0)};
}
export function cartError(error:unknown) {
    if (axios.isAxiosError(error)) {
        const code = error.response?.data?.code;
        if (["INSUFFICIENT_STOCK","CART_ITEM_UNAVAILABLE"].includes(code)) return "O estoque mudou. Revise a quantidade e os itens disponíveis.";
        if (code === "SKU_REQUIRED") return "Escolha uma variação na página do produto.";
        if (!error.response) return "Não foi possível conectar. Verifique sua conexão e tente novamente.";
    }
    return "Não foi possível concluir esta ação. Tente novamente.";
}
