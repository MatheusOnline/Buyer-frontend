import { expect, it, vi } from 'vitest';
import { copyPixCode, pixError, pixQrSource, pixRemaining, pixState } from '../src/features/pix/utils/pixPayment';
import type { PixPayment } from '../src/features/pix/types';
const now=new Date('2030-01-01T12:00:00Z').getTime();
const payment:PixPayment={payment_id:'fixture',status:'pending',amount:99.9,qr_code:'DEMONSTRACAO SEM COBRANCA',expires_at:'2030-01-01T12:30:00Z',payment_method:'pix'};
it('keeps waiting until the payment API confirms approval',()=>{
 expect(pixState(payment,now)).toBe('pending');
 expect(pixState({...payment,checkout_status:'paid'},now)).not.toBe('approved');
 expect(pixState({...payment,status:'approved'},now+3600000)).toBe('approved');
});
it('hides payment codes for expired, rejected, cancelled and refunded states',()=>{
 expect(pixState(payment,now+1800000)).toBe('expired');
 for(const state of ['cancelled','rejected','refunded'] as const)expect(pixState({...payment,status:state},now)).toBe(state);
 expect(pixState({...payment,status:'charged_back'},now)).toBe('refunded');
 expect(pixState({...payment,status:'in_process'},now)).toBe('processing');
});
it('does not offer a Pix when its value, method or code is unavailable',()=>{
 expect(pixState({...payment,amount:null},now)).toBe('unavailable');
 expect(pixState({...payment,qr_code:null},now)).toBe('unavailable');
 expect(pixState({...payment,payment_method:'visa'},now)).toBe('unsupported');
 expect(pixState({...payment,status:'unknown'},now)).toBe('unavailable');
});
it('shows the real expiration and never invents a deadline',()=>{
 expect(pixRemaining(payment.expires_at,now)).toBe('30:00');
 expect(pixRemaining(payment.expires_at,now+1800000)).toBe('00:00');
 expect(pixRemaining(null,now)).toBeNull();expect(pixRemaining('invalid',now)).toBeNull();
});
it('accepts a PNG data URI or raw base64 and rejects remote URLs',()=>{
 expect(pixQrSource('YWJj')).toBe('data:image/png;base64,YWJj');
 expect(pixQrSource('data:image/png;base64,YWJj')).toBe('data:image/png;base64,YWJj');
 expect(pixQrSource('https://example.com/image.png')).toBeUndefined();
});
it('reports copy success only after the clipboard accepts the exact code',async()=>{
 const write=vi.fn().mockResolvedValue(undefined);
 expect(await copyPixCode(payment.qr_code!,write)).toBe(true);expect(write).toHaveBeenCalledWith(payment.qr_code);
 expect(await copyPixCode(payment.qr_code!,vi.fn().mockRejectedValue(Error('denied')))).toBe(false);
 const empty=vi.fn();expect(await copyPixCode('',empty)).toBe(false);expect(empty).not.toHaveBeenCalled();
});
it('explains unavailable payments without exposing provider internals',()=>{
 expect(pixError({isAxiosError:true,response:{data:{code:'PAYMENT_NOT_FOUND'}}})).toContain('Ainda não há');
 expect(pixError({isAxiosError:true,response:{status:404}})).toContain('não foi encontrado');
 expect(pixError(Error('merchant credentials'))).not.toContain('credentials');
});
