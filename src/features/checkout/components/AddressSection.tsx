import { useState } from "react";
import { FiMapPin, FiPlus } from "react-icons/fi";
import type { AddressDraft, CheckoutAddress } from "../types";
import { useCheckoutAddresses, useCreateCheckoutAddress, useSelectCheckoutAddress } from "../hooks/useCheckout";
import { checkoutError, formatCep } from "../utils/checkoutValidation";
import { AddressForm } from "./AddressForm";
import { AddressList, AddressOption, ErrorBox, Hint, Panel, SectionHead, Secondary } from "./checkout.styles";
export function AddressSection({checkoutId,address,editable,onBusy}:{checkoutId:string;address:CheckoutAddress|null;editable:boolean;onBusy?:(busy:boolean)=>void}) {
    const list = useCheckoutAddresses(editable);
    const attach = useSelectCheckoutAddress(checkoutId);
    const create = useCreateCheckoutAddress();
    const [creating,setCreating] = useState(false);
    const [message,setMessage] = useState("");
    const busy = attach.isPending || create.isPending;
    const addresses = list.data ?? [];
    function select(id:string) {
        if (busy || !editable) return;
        setMessage("");onBusy?.(true);
        attach.mutate(id,{onError:error=>setMessage(checkoutError(error)),onSettled:()=>onBusy?.(false)});
    }
    async function save(values:AddressDraft) {
        if (busy) return;
        setMessage("");onBusy?.(true);
        let saved = false;
        try {
            const created = await create.mutateAsync(values);saved = true;setCreating(false);
            await attach.mutateAsync(created.id);
        }catch(error) {setMessage(saved ? "Endereço salvo. Não foi possível vinculá-lo à compra; selecione-o na lista abaixo para tentar novamente." : checkoutError(error));}
        finally {onBusy?.(false);}
    }
    const display = editable ? addresses : address ? [address] : [];
    return <Panel aria-labelledby="delivery-title"><SectionHead><h2 id="delivery-title"><FiMapPin />Endereço de entrega</h2>{address && <span>Selecionado</span>}</SectionHead>
        {editable && list.isLoading ? <Hint role="status">Carregando seus endereços…</Hint> : editable && list.isError ? <><ErrorBox role="alert">Não foi possível carregar os endereços.</ErrorBox><Secondary type="button" disabled={list.isFetching} onClick={()=>list.refetch()}>Tentar novamente</Secondary></> : <>
            {!!display.length && <AddressList role="radiogroup" aria-label="Escolha o endereço de entrega">{display.map(item=><AddressOption key={item.id} $selected={address?.id === item.id}><input type="radio" name="delivery-address" aria-label={`${item.label}, ${item.street}, ${item.number}`} checked={address?.id === item.id} disabled={!editable || busy} onChange={()=>select(item.id)} /><div><strong>{item.label}</strong>{address?.id === item.id && <small>Usar nesta compra</small>}<p>{item.street}, {item.number}{item.complement ? ` · ${item.complement}` : ""}<br/>{item.district} · {item.city}<br/>CEP {formatCep(item.postal_code)}</p></div></AddressOption>)}</AddressList>}
            {!display.length && !creating && <Hint>Adicione um endereço para continuar com sua compra.</Hint>}
            {editable && !creating && <Secondary type="button" disabled={busy || addresses.length >= 3} onClick={()=>{setCreating(true);setMessage("");}}><FiPlus />Adicionar endereço</Secondary>}
            {editable && addresses.length >= 3 && !creating && <Hint>Você pode salvar até 3 endereços. Gerencie-os em Minha conta.</Hint>}
            {editable && creating && <AddressForm onSave={values=>{void save(values);}} onCancel={()=>setCreating(false)} busy={busy} />}
        </>}
        {busy && <Hint role="status">Atualizando endereço da compra…</Hint>}{message && <ErrorBox role="alert">{message}</ErrorBox>}
    </Panel>;
}
