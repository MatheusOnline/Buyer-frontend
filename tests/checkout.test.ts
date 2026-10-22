import { expect, it } from 'vitest';
import { addressPayload, checkoutError, checkoutState, formatCep, validateAddress } from '../src/features/checkout/utils/checkoutValidation';
import type { AddressDraft, CheckoutDetail } from '../src/features/checkout/types';
const address:AddressDraft={label:' Casa ',postal_code:'87500-000',city:' Umuarama ',street:' Rua de teste ',number:'123',district:' Centro ',reference:'',complement:''};
const checkout:CheckoutDetail={checkoutId:'fixture',status:'pending',expires_at:'2030-01-01T12:00:00Z',payment_id:null,payment_method:null,subtotal:100,discount:20,total:80,products:[],address:null};
it('normalizes addresses and omits blank optional fields rejected by the backend',()=>{
 expect(validateAddress(address)).toEqual({});
 expect(addressPayload(address)).toEqual({label:'Casa',city:'Umuarama',street:'Rua de teste',number:'123',district:'Centro',postal_code:'87500000'});
 expect(addressPayload({...address,reference:' Portão azul '})).toHaveProperty('reference','Portão azul');
});
it('validates CEP, required fields and address field lengths',()=>{
 const errors=validateAddress({...address,label:' ',postal_code:'123',number:'1234567'});
 expect(errors.label).toBeTruthy();expect(errors.postal_code).toBeTruthy();expect(errors.number).toBeTruthy();
});
it('supports CEP pasting, length limits and deletion',()=>{
 expect(formatCep('87500000123')).toBe('87500-000');expect(formatCep('87500-00')).toBe('87500-00');expect(formatCep('')).toBe('');
});
it('blocks expired, closed and already processing checkouts',()=>{
 expect(checkoutState(checkout,new Date('2029-01-01').getTime())).toBe('ready');
 expect(checkoutState(checkout,new Date(checkout.expires_at!).getTime())).toBe('expired');
 expect(checkoutState({...checkout,status:'paid'},Date.now())).toBe('paid');
 expect(checkoutState({...checkout,status:'cancelled'},Date.now())).toBe('cancelled');
 expect(checkoutState({...checkout,payment_id:'existing'},Date.now())).toBe('processing');
});
it('explains failed steps without exposing server internals',()=>{
 expect(checkoutError({isAxiosError:true,response:{data:{code:'CHECKOUT_EXPIRED'}}})).toContain('expirou');
 expect(checkoutError({isAxiosError:true,response:{status:404}})).toContain('não foi encontrada');
 expect(checkoutError(new Error('database password'))).not.toContain('password');
});
