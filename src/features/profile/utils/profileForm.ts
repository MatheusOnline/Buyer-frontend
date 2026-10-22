import axios from 'axios';
import type {Profile,ProfileDraft,ProfileErrors} from '../types';
export const profileDraft=(profile:Profile):ProfileDraft=>({firstname:profile.firstname??'',email:profile.email??'',phone:profile.phone??''});
export const profilePayload=(draft:ProfileDraft):ProfileDraft=>({firstname:draft.firstname.trim(),email:draft.email.trim().toLowerCase(),phone:draft.phone.replace(/\D/g,'')});
export function profileValidation(draft:ProfileDraft):ProfileErrors {
    const values=profilePayload(draft);const errors:ProfileErrors={};
    if(!values.firstname)errors.firstname='Informe seu nome.';
    else if(values.firstname.length>100)errors.firstname='Use até 100 caracteres.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)||values.email.length>255)errors.email='Informe um e-mail válido.';
    if(values.phone.length!==11)errors.phone='Informe seu celular com DDD e 11 dígitos.';
    return errors;
}
export function profileChanged(draft:ProfileDraft,profile:Profile) {const next=profilePayload(draft);const current=profilePayload(profileDraft(profile));return (Object.keys(next) as (keyof ProfileDraft)[]).some(key=>next[key]!==current[key]);}
export function initials(name:string) {return name.trim().split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase()||'CL';}
export function profileFailure(error:unknown) {
    if(axios.isAxiosError(error)) {
        if(error.response?.status===409)return 'Este e-mail já está em uso por outra conta.';
        if(error.response?.status===401)return 'Sua sessão expirou. Entre novamente para continuar.';
        if(!error.response)return 'Não foi possível conectar. Verifique sua conexão e tente novamente.';
    }
    return 'Não foi possível salvar seus dados. Confira os campos e tente novamente.';
}
