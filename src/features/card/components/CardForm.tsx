import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { ErrorBox, StatusText, Button } from '../../pix/components/pix.styles';
import type { CardRequest } from '../api/cardApi';
initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || 'TEST-e1ece030-0820-4db4-8ea3-4a30fbda9c9c');
type Props = {checkoutId:string;amount:number;onPay:(request:CardRequest)=>Promise<void>};
export function CardForm({checkoutId,amount,onPay}:Props) {
    const [ready,setReady]=useState(false);
    const [failed,setFailed]=useState(false);
    const [attempt,setAttempt]=useState(0);
    const initialization=useMemo(()=>({amount}),[amount]);
    const customization=useMemo(()=>({paymentMethods:{minInstallments:1,maxInstallments:1},visual:{hideFormTitle:true,style:{theme:'default' as const,customVariables:{baseColor:'#008ecc',borderRadiusSmall:'4px',borderRadiusMedium:'6px',borderRadiusLarge:'8px'}}}}),[]);
    const payRef=useRef(onPay);
    useEffect(()=>{payRef.current=onPay;},[onPay]);
    const handleReady=useCallback(()=>setReady(true),[]);
    const handleError=useCallback(()=>setFailed(true),[]);
    const handleSubmit=useCallback(async (form:{token:string;payment_method_id:string})=>{
        if(!form.token||!form.payment_method_id) throw new Error('Confira os dados do cartão.');
        await payRef.current({checkout_id:checkoutId,cardToken:form.token,payment_method_id:form.payment_method_id});
    },[checkoutId]);
    return <div aria-busy={!ready&&!failed}>
        {!ready&&!failed&&<StatusText role="status">Carregando formulário protegido do Mercado Pago…</StatusText>}
        {failed&&<><ErrorBox role="alert">Não foi possível carregar o formulário do cartão. Verifique sua conexão e tente novamente.</ErrorBox><Button type="button" onClick={()=>{setFailed(false);setReady(false);setAttempt(value=>value+1);}}>Recarregar formulário</Button></>}
        {!failed&&<CardPayment key={attempt} initialization={initialization} customization={customization} locale="pt-BR"
            onReady={handleReady} onError={handleError} onSubmit={handleSubmit}/>}

    </div>;
}
