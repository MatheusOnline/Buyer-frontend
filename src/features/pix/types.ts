export type PixPayment = {payment_id:string|number;order_pending?:boolean;status:string|null;amount:number|null;qr_code?:string|null;qr_code_base64?:string|null;expires_at?:string|null;checkout_status?:string;payment_method?:string|null};
export type PixResponse = {success:boolean;data:PixPayment};
export type PixState = "pending"|"processing"|"approved"|"expired"|"cancelled"|"rejected"|"refunded"|"unavailable"|"unsupported";
