import type {CheckoutDetail} from '../checkout/types';
export type Order = Omit<CheckoutDetail,'address'> & {created_at:string|null;fulfillments?:Fulfillment[]};
export type OrderFilter = 'all'|'pending'|'paid'|'closed';
export type OrderResponse = {success:boolean;data:{orders:Order[];pagination:{page:number;limit:number;totalItems:number;totalPages:number}}};
export type DeliveryAddress={label?:string;street?:string;number?:string;district?:string;city?:string;postal_code?:string;complement?:string|null;reference?:string|null};
export type Fulfillment={id:string;checkout_id:string;reference:string;seller_name:string;status:'paid'|'preparing'|'ready'|'shipped'|'delivered'|'stock_review';payment_status:string;paid_at:string|null;preparing_at:string|null;collected_at:string|null;delivered_at:string|null;receipt_confirmed_at:string|null;delivery_reported_at:string|null;can_confirm_receipt:boolean;can_report_missing:boolean;delivery_address:DeliveryAddress;products:CheckoutDetail['products']};
export type BuyerOrderDetail=CheckoutDetail&{created_at?:string|null;fulfillments?:Fulfillment[]};
