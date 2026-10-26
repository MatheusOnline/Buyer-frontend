import { useState } from "react";
import type { FormEvent } from "react";
import type { AddressDraft } from "../types";
import { formatCep, validateAddress } from "../utils/checkoutValidation";
import { Field, Form, Primary, Row, Secondary } from "./checkout.styles";
import {usePostalCode} from "../../addresses/hooks/usePostalCode";
const initial:AddressDraft = {label:"",postal_code:"",city:"",street:"",number:"",district:"",complement:"",reference:""};
export function AddressForm({onSave,onCancel,busy}:{onSave:(values:AddressDraft)=>void;onCancel:()=>void;busy:boolean}) {
    const [values,setValues] = useState(initial);
    const cepMessage=usePostalCode(values,setValues);
    const [errors,setErrors] = useState<ReturnType<typeof validateAddress>>({});
    function submit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(busy) return;
        const next = validateAddress(values);setErrors(next);
        const first = Object.keys(next)[0];
        if (first) {event.currentTarget.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();return;}
        onSave(values);
    }
    function field(name:keyof AddressDraft,label:string,placeholder:string,maxLength:number,autoComplete?:string) {
        return <Field htmlFor={`address-${name}`}>{label}<input id={`address-${name}`} name={name} value={values[name]} placeholder={placeholder} maxLength={maxLength} autoComplete={autoComplete} inputMode={name === "postal_code" ? "numeric" : undefined} disabled={busy} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `address-${name}-error` : undefined} onChange={event=>{const value=event.target.value;setValues(previous=>({...previous,[name]:name === "postal_code" ? formatCep(value) : value}));setErrors(previous=>({...previous,[name]:undefined}));}} />{name==="postal_code"&&<small role="status">{cepMessage||"Digite o CEP para preencher rua, bairro e cidade."}</small>}{errors[name] && <span id={`address-${name}-error`}>{errors[name]}</span>}</Field>;
    }
    return <Form noValidate onSubmit={submit} aria-busy={busy}><h3>Novo endereço</h3><Row>{field("label","Nome do endereço","Ex.: Casa, trabalho",100)}{field("postal_code","CEP","00000-000",9,"postal-code")}</Row><Row>{field("city","Cidade","Sua cidade",100,"address-level2")}{field("district","Bairro","Seu bairro",255,"address-level3")}</Row><Row>{field("street","Rua","Nome da rua",255,"address-line1")}{field("number","Número","Número ou S/N",6)}</Row>{field("complement","Complemento (opcional)","Apartamento, bloco…",255,"address-line2")}{field("reference","Referência (opcional)","Um ponto de referência",255)}<footer><Secondary type="button" disabled={busy} onClick={onCancel}>Cancelar</Secondary><Primary type="submit" disabled={busy}>{busy ? "Salvando endereço…" : "Salvar e usar endereço"}</Primary></footer></Form>;
}
