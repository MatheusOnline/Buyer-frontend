import axios from 'axios';
import {addressPayload,validateAddress,formatCep} from '../../checkout/utils/checkoutValidation';
import type {AddressValues,SavedAddress} from '../types';
export {formatCep,validateAddress};
export function addressValues(address?:SavedAddress,first=false):AddressValues {return {label:address?.label??'',is_default:address?.is_default??first,city:address?.city??'',street:address?.street??'',number:address?.number??'',district:address?.district??'',postal_code:formatCep(address?.postal_code??''),reference:address?.reference??'',complement:address?.complement??''};}
export function savedAddressPayload(values:AddressValues) {return {...addressPayload(values),reference:values.reference.trim(),complement:values.complement.trim(),is_default:values.is_default};}
export function addressError(error:unknown) {
    if(axios.isAxiosError(error)) {
        if(error.response?.data?.code==='ADDRESS_LIMIT')return 'Você pode cadastrar até 3 endereços. Edite ou remova um deles para continuar.';
        if(error.response?.status===404)return 'Este endereço não está mais disponível. Atualize a lista.';
        if(error.response?.status===401)return 'Sua sessão expirou. Entre novamente para continuar.';
        if(!error.response)return 'Não foi possível conectar. Verifique sua conexão e tente novamente.';
    }
    return 'Não foi possível concluir a alteração. Confira os dados e tente novamente.';
}
