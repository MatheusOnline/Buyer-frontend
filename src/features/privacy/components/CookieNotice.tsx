import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
const key='compraslocal:cookie-notice:v1';
export const openCookieNotice=()=>window.dispatchEvent(new Event('compraslocal:open-cookie-notice'));
function hasAcknowledged(){try{return localStorage.getItem(key)==='acknowledged';}catch{return false;}}
export function CookieNotice(){
 const [visible,setVisible]=useState(()=>!hasAcknowledged());
 useEffect(()=>{
  const open=()=>setVisible(true);
  const sync=(event:StorageEvent)=>{if(event.key===key||event.key===null)setVisible(!hasAcknowledged());};
  window.addEventListener('compraslocal:open-cookie-notice',open);
  window.addEventListener('storage',sync);
  return()=>{window.removeEventListener('compraslocal:open-cookie-notice',open);window.removeEventListener('storage',sync);};
 },[]);
 function acknowledge(){try{localStorage.setItem(key,'acknowledged');}catch{/* The notice can still be dismissed for this visit. */}setVisible(false);}
 if(!visible)return null;
 return <Notice aria-labelledby="cookie-notice-title"><Content><div><h2 id="cookie-notice-title">Cookies para sua navegação</h2><p>Usamos cookies de sessão e recursos necessários para manter seu acesso e proteger sua conta. Google, Apple e Mercado Pago também podem usar recursos próprios quando você utiliza essas integrações. <Link to="/politica-de-privacidade#navegador">Saiba mais na Política de Privacidade</Link>.</p></div><button type="button" onClick={acknowledge}>Entendi</button></Content></Notice>;
}
const Notice=styled.aside`position:fixed;bottom:16px;left:16px;right:16px;z-index:1000;background:#fff;border:1px solid #dce7ef;border-radius:8px;box-shadow:0 5px 28px #193c5324;padding:20px 24px;max-width:1040px;margin:0 auto;color:#365c74;@media(max-width:600px){left:10px;right:10px;bottom:10px;padding:18px;}`;
const Content=styled.div`display:flex;align-items:center;gap:26px;h2{font-size:15px;margin:0 0 8px;}p{font-size:12px;line-height:1.8;color:#607c8e;margin:0;}a{color:#087fa9;text-underline-offset:3px;}button{flex-shrink:0;border:1px solid #008ecc;background:#008ecc;color:white;border-radius:6px;padding:12px 24px;min-height:44px;font-size:13px;font-weight:600;cursor:pointer;}button:hover{background:#007db4;}a:focus-visible,button:focus-visible{outline:2px solid #008ecc;outline-offset:4px;}@media(max-width:600px){align-items:stretch;flex-direction:column;gap:14px;button{align-self:flex-start;}}`;
