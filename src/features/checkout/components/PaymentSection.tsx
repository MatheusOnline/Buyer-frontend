import { FiCreditCard, FiGrid } from "react-icons/fi";
import type { PaymentMethod } from "../types";
import { Identity, Panel, PaymentOption, PaymentOptions, SectionHead } from "./checkout.styles";
export function PaymentSection({value,onChange,disabled,cpf}:{value:PaymentMethod;onChange:(value:PaymentMethod)=>void;disabled:boolean;cpf:string}) {
    const digits = cpf.replace(/\D/g,"");
    return <Panel aria-labelledby="payment-title"><SectionHead><h2 id="payment-title"><FiCreditCard />Como você quer pagar?</h2></SectionHead><PaymentOptions disabled={disabled}><legend>Forma de pagamento</legend><PaymentOption $selected={value === "PIX"}><input type="radio" name="payment-method" value="PIX" checked={value === "PIX"} onChange={()=>onChange("PIX")} /><FiGrid /><div><strong>Pix</strong><small>Gere o código na próxima etapa</small></div></PaymentOption><PaymentOption $selected={value === "CARTAO"}><input type="radio" name="payment-method" value="CARTAO" checked={value === "CARTAO"} onChange={()=>onChange("CARTAO")} /><FiCreditCard /><div><strong>Cartão</strong><small>Informe os dados na próxima etapa</small></div></PaymentOption></PaymentOptions><Identity><span>CPF vinculado à sua conta</span><strong>{digits.length === 11 ? `***.***.${digits.slice(6,9)}-${digits.slice(9)}` : "Consulte seus dados em Minha conta"}</strong></Identity></Panel>;
}
