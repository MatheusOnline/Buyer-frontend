export type CheckoutAddress = {id:string;label:string;street:string;number:string;city:string;district:string;postal_code:string;complement:string|null;reference:string|null};
export type AddressDraft = {label:string;street:string;number:string;city:string;district:string;postal_code:string;complement:string;reference:string};
export type CheckoutDetail = {checkoutId:string;status:"pending"|"paid"|"cancelled"|"expired";expires_at:string|null;payment_id:string|null;payment_method:string|null;subtotal:number;total:number;discount:number;products:{id:string;product_id:string;sku_id:string|null;name:string;image:string|null;quantity:number;price:number}[];address:CheckoutAddress|null};
export type PaymentMethod = "PIX"|"CARTAO"|"";
