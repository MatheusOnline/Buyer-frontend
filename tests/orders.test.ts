import {afterEach,expect,it,vi} from 'vitest';
import {api} from '../src/service/api';
import {ordersApi} from '../src/features/orders/api/ordersApi';
import {orderDate,orderFilter,orderPage,orderStatus,paymentLink} from '../src/features/orders/utils/orders';
import type {Order} from '../src/features/orders/types';
const order={checkoutId:'demo',status:'pending',expires_at:'2030-01-01',payment_id:null,payment_method:null} as Order;
afterEach(()=>vi.restoreAllMocks());
it('requests the authenticated purchase history with filters and pagination',async()=>{const signal=new AbortController().signal;const get=vi.spyOn(api,'get').mockResolvedValue({data:{success:true,data:{orders:[]}}});await ordersApi.list(2,'paid',signal);expect(get).toHaveBeenCalledWith('/checkout',{params:{page:2,status:'paid'},signal});});
it('loads the selected purchase instead of fixed demo details',async()=>{const get=vi.spyOn(api,'get').mockResolvedValue({data:order});await ordersApi.detail('selected');expect(get).toHaveBeenCalledWith('/checkout/selected',{signal:undefined});});
it('distinguishes confirmed purchases, expired checkouts and payment awaiting confirmation',()=>{const now=new Date('2031-01-01').getTime();expect(orderStatus(order,now).label).toBe('Compra expirada');expect(orderStatus({...order,status:'paid'},now).key).toBe('paid');expect(orderStatus({...order,payment_id:'payment'},now).label).toBe('Aguardando confirmação');expect(orderStatus({...order,status:'cancelled'},now).key).toBe('closed');});
it('uses the existing payment route without creating another charge',()=>{expect(paymentLink({...order,expires_at:'2099-01-01'})).toBe('/payment/checkout/demo');expect(paymentLink({...order,payment_id:'payment',payment_method:'pix'})).toBe('/payment/pix/demo');expect(paymentLink({...order,payment_id:'payment',payment_method:'card'})).toBe('/payment/card/demo');expect(paymentLink({...order,status:'cancelled'})).toBeNull();expect(paymentLink({...order,status:'paid'})).toBeNull();});
it('normalizes invalid filters and page parameters',()=>{expect(orderFilter('delivered')).toBe('all');expect(orderFilter('paid')).toBe('paid');for(const value of ['0','-1','1.5','Infinity','100001',null])expect(orderPage(value)).toBe(1);expect(orderPage('2')).toBe(2);});
it('handles missing dates without inventing a purchase date',()=>{expect(orderDate(null)).toBe('Data indisponível');expect(orderDate('bad')).toBe('Data indisponível');expect(orderDate('2026-10-21T12:00:00Z')).toContain('2026');});

it('tracks transport separately from payment and preserves mixed-store receipt states',async()=>{
 const {deliveryStatus,purchaseStatus}=await import('../src/features/orders/utils/orders');
 const delivery={id:'one',checkout_id:'demo',reference:'ONE',seller_name:'Store',status:'shipped',payment_status:'approved',collected_at:'2026-10-26T12:00:00Z',receipt_confirmed_at:null,delivery_reported_at:null} as import('../src/features/orders/types').Fulfillment;
 expect(deliveryStatus(delivery).label).toBe('A caminho');expect(deliveryStatus({...delivery,status:'ready'}).label).toBe('Pronto para coleta');
 expect(purchaseStatus({...order,status:'paid',fulfillments:[delivery,{...delivery,id:'two',status:'delivered'}]}).label).toBe('Entrega parcial');
 expect(purchaseStatus({...order,status:'paid',fulfillments:[{...delivery,status:'delivered',receipt_confirmed_at:'2026-10-26T13:00:00Z'}]}).label).toBe('Recebimento confirmado');
 expect(deliveryStatus({...delivery,status:'delivered',delivery_reported_at:'2026-10-26T13:00:00Z'}).description).toContain('não recebeu');
 expect(deliveryStatus({...delivery,payment_status:'refunded'}).label).toBe('Pagamento estornado');
 expect(purchaseStatus({...order,status:'paid',fulfillments:[delivery,{...delivery,id:'two',payment_status:'refunded'}]}).label).toBe('Estorno parcial');
 expect(purchaseStatus({...order,status:'paid',fulfillments:[{...delivery,payment_status:'refunded'},{...delivery,id:'two',payment_status:'refunded'}]}).label).toBe('Pagamento estornado');
});
it('contacts support with the selected reference without embedding private customer data',async()=>{
 const {supportLinks}=await import('../src/features/orders/utils/orders');const links=supportLinks('ABC12345');expect(links.whatsapp).toContain('https://wa.me/');expect(decodeURIComponent(links.whatsapp)).toContain('ABC12345');expect(links.email).toMatch(/^mailto:/);
});
