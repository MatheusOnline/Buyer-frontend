import { afterEach, expect, it, vi } from 'vitest';
import { cartTotals, cartError } from '../src/features/cart/utils/cartTotals';
import { cartApi } from '../src/features/cart/api/cartApi';
import { api } from '../src/service/api';
import type { CartItem } from '../src/features/cart/types';
const item = (extra:Partial<CartItem> = {}):CartItem => ({id:'1',product_id:'product',sku_id:'sku',title:'Produto',store:'Loja',image:null,variation:null,sku:'SKU',quantity:3,price:19.9,original_price:29.9,promotion:null,available_stock:10,available:true,reason:null,line_total:59.7,...extra});
afterEach(()=>vi.restoreAllMocks());
it('calculates prices with cent precision and promotional savings',()=>{
 expect(cartTotals([item()])).toEqual({subtotal:89.7,discount:30,total:59.7,quantity:3});
 expect(cartTotals([item({price:0.1,original_price:0.3})]).total).toBe(0.3);
});
it('excludes unavailable products from payable totals',()=>{
 expect(cartTotals([item({available:false})])).toEqual({subtotal:0,discount:0,total:0,quantity:0});
});
it('sends the chosen SKU and quantity and preserves simple catalog callers',async()=>{
 const post=vi.spyOn(api,'post').mockResolvedValue({data:{success:true}});
 await cartApi.add({product_id:'p',sku_id:'chosen',quantity:2});
 expect(post).toHaveBeenLastCalledWith('/cart',{product_id:'p',sku_id:'chosen',quantity:2});
 await cartApi.add('p');expect(post).toHaveBeenLastCalledWith('/cart',{product_id:'p'});
});
it('uses cart row IDs when changing quantities and removing',async()=>{
 const patch=vi.spyOn(api,'patch').mockResolvedValue({data:{success:true}});
 const remove=vi.spyOn(api,'delete').mockResolvedValue({data:{success:true}});
 await cartApi.increase('42');expect(patch).toHaveBeenLastCalledWith('/cart/42/increase');
 await cartApi.decrease('42');expect(patch).toHaveBeenLastCalledWith('/cart/42/decrease');
 await cartApi.remove('42');expect(remove).toHaveBeenLastCalledWith('/cart/42');
});
it('explains stock changes without exposing internal errors',()=>{
 expect(cartError({isAxiosError:true,response:{data:{code:'INSUFFICIENT_STOCK'}}})).toContain('estoque');
 expect(cartError(new Error('database credentials'))).not.toContain('credentials');
});
