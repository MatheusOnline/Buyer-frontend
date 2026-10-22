import {useEffect,useRef,useState} from 'react';
import type {FormEvent} from 'react';
import {FiCheck,FiX} from 'react-icons/fi';
import type {AddressValues,SavedAddress} from '../types';
import {addressValues,formatCep,validateAddress} from '../utils/addressForm';
import {Actions,Button,Feedback,Field,Fields,Input} from '../../profile/components/profile.styles';
import {Check,Dialog} from './addresses.styles';
export function AddressEditor({address,first,onSave,onClose,busy,error}:{address?:SavedAddress;first:boolean;onSave:(values:AddressValues)=>Promise<void>;onClose:()=>void;busy:boolean;error:string}) {
    const dialog=useRef<HTMLDialogElement>(null);
    const [values,setValues]=useState(()=>addressValues(address,first));
    const [errors,setErrors]=useState<ReturnType<typeof validateAddress>>({});
    useEffect(()=>{const element=dialog.current;element?.showModal();return()=>element?.close();},[]);
    async function submit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();if(busy)return;const invalid=validateAddress(values);setErrors(invalid);
        const field=Object.keys(invalid)[0];if(field){event.currentTarget.querySelector<HTMLInputElement>(`[name="${field}"]`)?.focus();return;}
        await onSave(values);
    }
    function field(name:Exclude<keyof AddressValues,'is_default'>,label:string,max:number,autoComplete?:string,placeholder?:string) {
        return <Field><label htmlFor={`saved-address-${name}`}>{label}</label><Input id={`saved-address-${name}`} name={name} value={values[name]} maxLength={max} autoComplete={autoComplete} placeholder={placeholder} disabled={busy} inputMode={name==='postal_code'?'numeric':undefined} aria-invalid={!!errors[name]} aria-describedby={errors[name]?`saved-address-${name}-error`:undefined} onChange={event=>{const value=name==='postal_code'?formatCep(event.target.value):event.target.value;setValues(current=>({...current,[name]:value}));setErrors(current=>({...current,[name]:undefined}));}}/>{errors[name]&&<small role="alert" id={`saved-address-${name}-error`}>{errors[name]}</small>}</Field>;
    }
    return <Dialog ref={dialog} aria-labelledby="address-editor-title" onCancel={event=>{if(busy)event.preventDefault();else onClose();}}><header><h2 id="address-editor-title">{address?'Editar endereço':'Novo endereço'}</h2><Button type="button" aria-label="Fechar formulário" onClick={onClose} disabled={busy}><FiX/></Button></header><p>Confira os dados de entrega. Alterações valem para as próximas compras.</p>
        <form noValidate onSubmit={submit} aria-busy={busy}><Fields>{field('label','Nome do endereço',100,undefined,'Ex.: Casa, trabalho')}{field('postal_code','CEP',9,'postal-code','00000-000')}{field('street','Rua',255,'address-line1')}{field('number','Número',6,undefined,'Número ou S/N')}{field('district','Bairro',255,'address-level3')}{field('city','Cidade',100,'address-level2')}{field('complement','Complemento (opcional)',255,'address-line2')}{field('reference','Referência (opcional)',255)}</Fields>
            <Check><input type="checkbox" checked={values.is_default} disabled={busy||first||!!address?.is_default} onChange={event=>setValues(current=>({...current,is_default:event.target.checked}))}/><span>Usar como endereço principal<small>{first||address?.is_default?'Escolha outro endereço como principal pela lista para trocar.':'Será sugerido nos próximos checkouts.'}</small></span></Check>
            {error&&<Feedback role="alert" $error>{error}</Feedback>}<Actions><span>Campos com “opcional” podem ficar vazios.</span><div><Button type="button" onClick={onClose} disabled={busy}>Cancelar</Button><Button type="submit" $primary disabled={busy}><FiCheck/>{busy?'Salvando…':'Salvar endereço'}</Button></div></Actions>
        </form>
    </Dialog>;
}
