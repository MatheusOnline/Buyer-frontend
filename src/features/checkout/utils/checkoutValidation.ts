import axios from "axios";
import type { AddressDraft, CheckoutDetail } from "../types";
export function validateAddress(values:AddressDraft) {
    const errors:Partial<Record<keyof AddressDraft,string>> = {};
    const fields = {label:[100,"Dê um nome para este endereço."],city:[100,"Informe a cidade."],street:[255,"Informe a rua."],number:[6,"Informe o número ou S/N."],district:[255,"Informe o bairro."]} as const;
    for (const field of Object.keys(fields) as (keyof typeof fields)[]) {
        if (!values[field].trim()) errors[field] = fields[field][1];
        else if (values[field].trim().length > fields[field][0]) errors[field] = `Use até ${fields[field][0]} caracteres.`;
    }
    if (values.postal_code.replace(/\D/g,"").length !== 8) errors.postal_code = "Informe um CEP com 8 dígitos.";
    for (const field of ["complement","reference"] as const) if (values[field].length > 255) errors[field] = "Use até 255 caracteres.";
    return errors;
}
export function addressPayload(values:AddressDraft) {
    return {label:values.label.trim(),city:values.city.trim(),street:values.street.trim(),number:values.number.trim(),district:values.district.trim(),postal_code:values.postal_code.replace(/\D/g,""),...(values.complement.trim() ? {complement:values.complement.trim()} : {}),...(values.reference.trim() ? {reference:values.reference.trim()} : {})};
}
export function formatCep(value:string) {return value.replace(/\D/g,"").slice(0,8).replace(/^(\d{5})(\d{1,3})$/,"$1-$2");}
export function checkoutState(checkout:CheckoutDetail,now=Date.now()) {
    if (checkout.status === "paid") return "paid";
    if (checkout.status === "cancelled") return "cancelled";
    if (checkout.status === "expired" || (checkout.expires_at && new Date(checkout.expires_at).getTime() <= now)) return "expired";
    if (checkout.payment_id) return "processing";
    return "ready";
}
export function checkoutError(error:unknown) {
    if (axios.isAxiosError(error)) {
        const code = error.response?.data?.code;
        if (code === "CHECKOUT_EXPIRED") return "Esta compra expirou. Volte ao carrinho para continuar.";
        if (code === "CHECKOUT_LOCKED") return "Esta compra já está em processamento e não pode ser alterada.";
        if (code === "ADDRESS_NOT_FOUND") return "O endereço não está mais disponível. Selecione outro endereço.";
        if (code === "PAYMENT_ALREADY_CREATED") return "Já existe um pagamento para esta compra. Atualize a página para continuar.";
        if (error.response?.status === 404) return "Esta compra não foi encontrada ou não está disponível para sua conta.";
        if (!error.response) return "Não foi possível conectar. Verifique sua conexão e tente novamente.";
    }
    return "Não foi possível concluir esta etapa. Tente novamente em instantes.";
}
