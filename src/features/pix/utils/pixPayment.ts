import axios from "axios";
import type { PixPayment, PixState } from "../types";
export function pixState(payment:PixPayment,now=Date.now()):PixState {
    if (payment.payment_method && payment.payment_method !== "pix") return "unsupported";
    if (payment.status === "approved") return "approved";
    if (["refunded","charged_back"].includes(payment.status ?? "")) return "refunded";
    if (payment.status === "rejected") return "rejected";
    if (payment.status === "cancelled" || payment.checkout_status === "cancelled") return "cancelled";
    if (["in_process","in_mediation","authorized"].includes(payment.status ?? "")) return "processing";
    if (payment.checkout_status === "expired" || (payment.expires_at && new Date(payment.expires_at).getTime() <= now)) return "expired";
    if (payment.status === "pending" && payment.amount != null && Number.isFinite(Number(payment.amount)) && Number(payment.amount)>0 && (payment.qr_code || payment.qr_code_base64)) return "pending";
    return "unavailable";
}
export function pixRemaining(expiresAt:string|null|undefined,now=Date.now()) {
    if (!expiresAt || !Number.isFinite(new Date(expiresAt).getTime())) return null;
    const seconds=Math.max(0,Math.ceil((new Date(expiresAt).getTime()-now)/1000));
    return `${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;
}
export function pixQrSource(value?:string|null) {
    if (!value) return undefined;
    const raw=value.replace(/^data:image\/png;base64,/,"");
    return /^[A-Za-z0-9+/\r\n]+={0,2}$/.test(raw) ? `data:image/png;base64,${raw}` : undefined;
}
export async function copyPixCode(code:string,write?:(value:string)=>Promise<void>) {
    if (!code.trim()) return false;
    try {await (write ?? (value=>navigator.clipboard.writeText(value)))(code);return true;}catch{return false;}
}
export function pixError(error:unknown) {
    if (axios.isAxiosError(error)) {
        if (error.response?.data?.code === "PAYMENT_NOT_FOUND") return "Ainda não há um Pix gerado para esta compra. Volte ao checkout para revisar o pagamento.";
        if ([403,404].includes(error.response?.status??0)) return "Este pagamento não foi encontrado ou não está disponível para sua conta.";
        if (!error.response) return "Não foi possível consultar o pagamento. Verifique sua conexão e tente novamente.";
    }
    return "Não foi possível atualizar os dados do Pix. Tente novamente em instantes.";
}
export const pixMessages:Record<PixState,{title:string;description:string}> = {
    pending:{title:"Aguardando pagamento",description:"Pague pelo aplicativo do seu banco. Esta tela acompanha a confirmação automaticamente."},
    processing:{title:"Pagamento em processamento",description:"O pagamento está sendo analisado. Aguarde a confirmação antes de tentar pagar novamente."},
    approved:{title:"Pagamento confirmado",description:"Recebemos a confirmação do seu Pix. Você pode acompanhar sua compra na sua conta."},
    expired:{title:"Este Pix expirou",description:"Não utilize este código. Se já pagou, consulte o status antes de iniciar outra compra."},
    cancelled:{title:"Pagamento cancelado",description:"Este código não está mais disponível para pagamento. Confira sua compra antes de continuar."},
    rejected:{title:"Pagamento não aprovado",description:"Consulte os detalhes no aplicativo do seu banco antes de fazer uma nova tentativa."},
    refunded:{title:"Pagamento devolvido ou contestado",description:"Consulte o aplicativo do seu banco e acompanhe os detalhes na sua conta."},
    unavailable:{title:"Código Pix indisponível",description:"Não foi possível obter um código válido para pagamento. Atualize o status ou volte ao checkout."},
    unsupported:{title:"Este pagamento não é um Pix",description:"Volte ao checkout para conferir a forma de pagamento desta compra."},
};
