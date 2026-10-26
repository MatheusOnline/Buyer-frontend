export type PostalAddress = {street:string;district:string;city:string};
export async function lookupPostalCode(cep:string,signal:AbortSignal):Promise<PostalAddress>{
 const digits=cep.replace(/\D/g,'');
 if(digits.length!==8)throw new Error('Informe os 8 dígitos do CEP.');
 const response=await fetch(`https://viacep.com.br/ws/${digits}/json/`,{signal,credentials:'omit'});
 if(!response.ok)throw new Error('Não foi possível consultar o CEP. Preencha o endereço manualmente.');
 const data=await response.json();
 if(data.erro)throw new Error('CEP não encontrado. Confira o número ou preencha o endereço manualmente.');
 if(typeof data.localidade!=='string'||!data.localidade.trim())throw new Error('Não foi possível consultar o CEP. Preencha o endereço manualmente.');
 return {street:typeof data.logradouro==='string'?data.logradouro:'',district:typeof data.bairro==='string'?data.bairro:'',city:data.localidade};
}
