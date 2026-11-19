export type StoreBusinessDay = {day:number;enabled:boolean;start:string;end:string};
export type CartItem = {id:string;product_id:string;sku_id:string|null;title:string;store:string;store_is_open?:boolean;store_business_hours?:StoreBusinessDay[];image:string|null;variation:string|null;sku:string|null;quantity:number;price:number;original_price:number;promotion:{id:string;name:string}|null;available_stock:number;available:boolean;reason:string|null;line_total:number};
export type CartResponse = {success:boolean;data:CartItem[]};
export type AddCartItem = {product_id:string;sku_id?:string;quantity?:number};
