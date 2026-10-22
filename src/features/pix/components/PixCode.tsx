import QRCodeExport from "react-qr-code";
import { useEffect, useRef, useState } from "react";
import { FiCheck, FiClock, FiCopy, FiGrid } from "react-icons/fi";
import type { PixPayment } from "../types";
import { copyPixCode, pixQrSource, pixRemaining } from "../utils/pixPayment";
import { money } from "../../cart/utils/cartTotals";
import { Button, Code, CopyBlock, ErrorBox, Feedback, Primary, QrFrame, QrPanel, Timer } from "./pix.styles";
// The package may expose its CommonJS default as a nested export in Vite.
const QRCode = (QRCodeExport as unknown as {default?:typeof QRCodeExport}).default ?? QRCodeExport;
export function PixCode({payment,now}:{payment:PixPayment;now:number}) {
    const [copy,setCopy] = useState<{code:string;status:"success"|"failed"}|null>(null);
    const [failedImage,setFailedImage] = useState<string|null>(null);
    const textarea=useRef<HTMLTextAreaElement>(null);
    const timeout=useRef<ReturnType<typeof setTimeout>|null>(null);
    useEffect(()=>()=>{if(timeout.current)clearTimeout(timeout.current);},[]);
    const code=payment.qr_code??"";
    const source=pixQrSource(payment.qr_code_base64);
    const renderCode=code && new TextEncoder().encode(code).length <= 1800;
    const remaining=pixRemaining(payment.expires_at,now);
    const copied=copy?.code===code ? copy.status : null;
    async function handleCopy() {
        if (payment.expires_at && new Date(payment.expires_at).getTime() <= Date.now()) return;
        const success=await copyPixCode(code);
        setCopy({code,status:success ? "success" : "failed"});
        if(timeout.current)clearTimeout(timeout.current);
        if(success)timeout.current=setTimeout(()=>setCopy(null),4000);
    }
    return <QrPanel aria-labelledby="pix-code-title"><h2 id="pix-code-title"><FiGrid />Pague com Pix</h2><p>Valor do pagamento</p><strong>{money(Number(payment.amount))}</strong>
        <QrFrame>{source && source!==failedImage ? <img src={source} alt="QR Code para pagamento Pix" onError={()=>setFailedImage(source)}/> : renderCode ? <QRCode value={code} size={224} level="M" title="QR Code para pagamento Pix"/> : <span>QR Code indisponível.<br/>Utilize o código Pix Copia e Cola abaixo, se disponível.</span>}</QrFrame>
        {remaining ? <Timer><FiClock aria-hidden="true"/>Código válido por {remaining}</Timer> : <Timer><FiClock aria-hidden="true"/>Confira a validade no aplicativo do banco</Timer>}
        <p>Escaneie o QR Code com o aplicativo do seu banco<br/>ou use o Pix Copia e Cola.</p>
        {code && <CopyBlock><label htmlFor="pix-copy-code">Pix Copia e Cola</label><Code id="pix-copy-code" ref={textarea} readOnly value={code} spellCheck={false} aria-label="Código Pix Copia e Cola"/><Primary type="button" onClick={()=>{void handleCopy();}}>{copied === "success" ? <FiCheck /> : <FiCopy />}{copied === "success" ? "Código copiado" : "Copiar código Pix"}</Primary>{copied === "success" && <Feedback role="status">Cole o código na opção Pix Copia e Cola do seu banco.</Feedback>}{copied === "failed" && <><ErrorBox role="alert">Não foi possível copiar automaticamente. Selecione o código para copiar manualmente.</ErrorBox><Button type="button" onClick={()=>{textarea.current?.focus();textarea.current?.select();}}>Selecionar código</Button></>}</CopyBlock>}
    </QrPanel>;
}
