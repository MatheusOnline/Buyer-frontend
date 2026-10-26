import {useEffect,useRef,useState} from 'react';
import type {Dispatch,SetStateAction} from 'react';
import {lookupPostalCode} from '../api/postalCodeApi';
type AddressFields={postal_code:string;street:string;district:string;city:string};
export function usePostalCode<T extends AddressFields>(values:T,setValues:Dispatch<SetStateAction<T>>){
 const initial=useRef(values.postal_code.replace(/\D/g,''));
 const [message,setMessage]=useState('');
 const latest=useRef(values);latest.current=values;
 const cep=values.postal_code.replace(/\D/g,'');
 useEffect(()=>{
  setMessage('');
  // Editing an existing address must preserve the saved, manually corrected data.
  if(cep===initial.current)return;
  initial.current='';
  if(cep.length!==8)return;
  const controller=new AbortController();let active=true;
  const timer=setTimeout(async()=>{
   const snapshot=latest.current;setMessage('Buscando endereço pelo CEP…');
   const timeout=setTimeout(()=>controller.abort(),8000);
   try{
    const result=await lookupPostalCode(cep,controller.signal);
    if(!active)return;
    setValues(current=>{
     if(current.postal_code.replace(/\D/g,'')!==cep)return current;
     return {...current,...Object.fromEntries(Object.entries(result).filter(([key])=>current[key as keyof AddressFields]===snapshot[key as keyof AddressFields]))};
    });
    setMessage('Endereço encontrado. Confira os dados e informe o número.');
   }catch(error){if(active)setMessage(error instanceof Error&&error.name!=='AbortError'?error.message:'A consulta demorou demais. Preencha o endereço manualmente.');}
   finally{clearTimeout(timeout);}
  },350);
  return()=>{active=false;clearTimeout(timer);controller.abort();};
 },[cep,setValues]);
 return message;
}
