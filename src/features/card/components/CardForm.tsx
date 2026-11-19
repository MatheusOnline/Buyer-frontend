import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import styled from 'styled-components';
import { ErrorBox, Button } from '../../pix/components/pix.styles';
import type { CardRequest } from '../api/cardApi';

type Props = { checkoutId:string; onPay:(request:CardRequest)=>Promise<void>; pending?:boolean };
const digits=(value:string,max:number)=>value.replace(/\D/g,'').slice(0,max);
const formatNumber=(value:string)=>digits(value,19).replace(/(\d{4})(?=\d)/g,'$1 ').trim();
const formatExpiry=(value:string)=>{const raw=digits(value,4);return raw.length>2?`${raw.slice(0,2)}/${raw.slice(2)}`:raw;};

export function CardForm({checkoutId,onPay,pending=false}:Props) {
    const [number,setNumber]=useState('');
    const [holder,setHolder]=useState('');
    const [expiry,setExpiry]=useState('');
    const [cvv,setCvv]=useState('');
    const [error,setError]=useState('');
    async function submit(event:FormEvent) {
        event.preventDefault();setError('');
        const [month,year]=expiry.split('/');
        if(digits(number,19).length<13||holder.trim().length<3||!month||month<'01'||month>'12'||!year||digits(year,2).length!==2||digits(cvv,4).length<3) {
            setError('Confira o número, nome, validade e código de segurança do cartão.');return;
        }
        try{await onPay({checkout_id:checkoutId,creditCard:{number:digits(number,19),holderName:holder.trim(),expiryMonth:month,expiryYear:`20${year}`,ccv:digits(cvv,4)}});}catch(cause){const responseMessage=(cause as {response?:{data?:{message?:string}}})?.response?.data?.message;setError(responseMessage||(cause instanceof Error&&cause.message!=='Request failed with status code 400'?cause.message:'Não foi possível processar o cartão. Confira os dados e tente novamente.'));}
    }
    return <form onSubmit={submit}>
        <Fields>
            <label>Número do cartão<input autoComplete="cc-number" inputMode="numeric" placeholder="0000 0000 0000 0000" value={number} onChange={(e:ChangeEvent<HTMLInputElement>)=>setNumber(formatNumber(e.target.value))} maxLength={23} required/></label>
            <label>Nome impresso no cartão<input autoComplete="cc-name" placeholder="Como aparece no cartão" value={holder} onChange={e=>setHolder(e.target.value)} maxLength={100} required/></label>
            <Row>
                <label>Validade<input autoComplete="cc-exp" inputMode="numeric" placeholder="MM/AA" value={expiry} onChange={e=>setExpiry(formatExpiry(e.target.value))} maxLength={5} required/></label>
                <label>CVV<input autoComplete="cc-csc" inputMode="numeric" placeholder="123" value={cvv} onChange={e=>setCvv(digits(e.target.value,4))} maxLength={4} required/></label>
            </Row>
        </Fields>
        {error&&<ErrorBox role="alert">{error}</ErrorBox>}
        <Button type="submit" disabled={pending}><FiCreditCard/>{pending?'Processando pagamento…':'Pagar com cartão'}</Button>
    </form>;
}
const Fields=styled.div`display:grid;gap:16px;label{display:grid;gap:7px;color:#456579;font-size:13px;font-weight:600;}input{height:48px;padding:0 14px;border:1px solid #d8e4eb;border-radius:6px;background:#fff;color:#24485b;font:inherit;font-weight:400;outline:none;transition:border-color .18s,box-shadow .18s;}input::placeholder{color:#9aabb6;}input:focus{border-color:#078dc7;box-shadow:0 0 0 3px rgba(0,142,204,.12);}`;
const Row=styled.div`display:grid;grid-template-columns:1fr 1fr;gap:14px;`;
