import {afterEach,expect,it,vi} from 'vitest';
import {api} from '../src/service/api';
import {addressesApi} from '../src/features/addresses/api/addressesApi';
import {addressValues,savedAddressPayload,validateAddress} from '../src/features/addresses/utils/addressForm';
const address={id:'address',label:'Casa',is_default:true,city:'Cidade',street:'Rua',number:'100',district:'Centro',postal_code:'12345678',reference:null,complement:null};
afterEach(()=>vi.restoreAllMocks());
it('prepares existing data for editing with nullable optional fields',()=>{expect(addressValues(address)).toMatchObject({postal_code:'12345-678',reference:'',complement:'',is_default:true});});
it('validates required fields and postal code before submitting',()=>{expect(Object.keys(validateAddress(addressValues()))).toContain('postal_code');expect(validateAddress(addressValues(address))).toEqual({});});
it('sends trimmed address fields and an explicit principal selection',()=>{const payload=savedAddressPayload({...addressValues(address),label:' Casa ',reference:'',complement:'',postal_code:'12345-678'});expect(payload).toMatchObject({label:'Casa',postal_code:'12345678',is_default:true,reference:'',complement:''});expect('id' in payload).toBe(false);});
it('uses the selected address for updates',async()=>{const patch=vi.spyOn(api,'patch').mockResolvedValue({data:{success:true,data:address}});await addressesApi.update({id:'selected',values:addressValues(address)});expect(patch).toHaveBeenCalledWith('/address/selected',savedAddressPayload(addressValues(address)));});
it('uses dedicated routes for principal selection and removal',async()=>{const patch=vi.spyOn(api,'patch').mockResolvedValue({data:{success:true}});const remove=vi.spyOn(api,'delete').mockResolvedValue({data:{success:true}});await addressesApi.setDefault('selected');await addressesApi.remove('selected');expect(patch).toHaveBeenCalledWith('/address/selected/default');expect(remove).toHaveBeenCalledWith('/address/selected');});

it('looks up postal code and maps only street, district and city',async()=>{
 const {lookupPostalCode}=await import('../src/features/addresses/api/postalCodeApi');
 const fetchMock=vi.spyOn(globalThis,'fetch').mockResolvedValue(new Response(JSON.stringify({logradouro:'Rua Exemplo',bairro:'Centro',localidade:'Umuarama',complemento:'Não copiar'})));
 const signal=new AbortController().signal;
 expect(await lookupPostalCode('87500-000',signal)).toEqual({street:'Rua Exemplo',district:'Centro',city:'Umuarama'});
 expect(fetchMock).toHaveBeenCalledWith('https://viacep.com.br/ws/87500000/json/',{signal,credentials:'omit'});
});
it('allows generic city postal codes and reports missing or unavailable postal codes',async()=>{
 const {lookupPostalCode}=await import('../src/features/addresses/api/postalCodeApi');
 const mock=vi.spyOn(globalThis,'fetch').mockResolvedValueOnce(new Response(JSON.stringify({localidade:'Cidade'}))).mockResolvedValueOnce(new Response(JSON.stringify({erro:true}))).mockResolvedValueOnce(new Response('',{status:503}));
 const signal=new AbortController().signal;
 expect(await lookupPostalCode('12345678',signal)).toEqual({street:'',district:'',city:'Cidade'});
 await expect(lookupPostalCode('12345678',signal)).rejects.toThrow('CEP não encontrado');
 await expect(lookupPostalCode('12345678',signal)).rejects.toThrow('manualmente');
 await expect(lookupPostalCode('123',signal)).rejects.toThrow('8 dígitos');
 expect(mock).toHaveBeenCalledTimes(3);
});
