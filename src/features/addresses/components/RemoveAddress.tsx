import {useEffect,useRef} from 'react';
import {FiX} from 'react-icons/fi';
import type {SavedAddress} from '../types';
import {Actions,Button,Feedback} from '../../profile/components/profile.styles';
import {Danger,Dialog} from './addresses.styles';
export function RemoveAddress({address,onClose,onConfirm,busy,error}:{address:SavedAddress;onClose:()=>void;onConfirm:()=>void;busy:boolean;error:string}) {
    const ref=useRef<HTMLDialogElement>(null);
    useEffect(()=>{const element=ref.current;element?.showModal();return()=>element?.close();},[]);
    return <Dialog ref={ref} aria-labelledby="remove-address-title" onCancel={event=>{if(busy)event.preventDefault();else onClose();}}><header><h2 id="remove-address-title">Remover este endereço?</h2><Button type="button" aria-label="Fechar confirmação" onClick={onClose} disabled={busy}><FiX/></Button></header><p><strong>{address.label}</strong><br/>{address.street}, {address.number} · {address.city}</p><p>Ele sairá da sua lista. Compras anteriores manterão os dados de entrega. {address.is_default?'Outro endereço disponível será definido como principal.':''}</p>{error&&<Feedback role="alert" $error>{error}</Feedback>}<Actions><div><Button type="button" onClick={onClose} disabled={busy}>Manter endereço</Button><Danger type="button" onClick={onConfirm} disabled={busy}>{busy?'Removendo…':'Sim, remover endereço'}</Danger></div></Actions></Dialog>;
}
