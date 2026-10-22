import type {CheckoutDetail} from '../checkout/types';
export type Order = Omit<CheckoutDetail,'address'> & {created_at:string|null};
export type OrderFilter = 'all'|'pending'|'paid'|'closed';
export type OrderResponse = {success:boolean;data:{orders:Order[];pagination:{page:number;limit:number;totalItems:number;totalPages:number}}};
