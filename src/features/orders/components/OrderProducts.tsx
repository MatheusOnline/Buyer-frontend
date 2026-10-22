import {useState} from 'react';
import {FiImage} from 'react-icons/fi';
import type {CheckoutDetail} from '../../checkout/types';
import {money} from '../../cart/utils/cartTotals';
import {Product,Products} from './orders.styles';
function Line({item}:{item:CheckoutDetail['products'][number]}) {const [failed,setFailed]=useState(false);return <Product><figure>{item.image&&!failed?<img src={item.image} alt="" loading="lazy" onError={()=>setFailed(true)}/>:<FiImage size={24}/>}</figure><div><h4>{item.name}</h4><p>{item.quantity} {item.quantity===1?'unidade':'unidades'} · {money(item.price)} cada</p></div><strong>{money(Math.round(item.price*100)*item.quantity/100)}</strong></Product>;}
export function OrderProducts({items}:{items:CheckoutDetail['products']}) {return <Products>{items.map(item=><Line key={item.id} item={item}/>)}</Products>;}
