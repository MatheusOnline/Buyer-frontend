import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FiArrowRight,FiHome,FiMapPin} from 'react-icons/fi';
import styled from 'styled-components';
import {DefaultTemplate} from '../../../Template/DefaultTemplate';
import {ScrollToTop} from '../../../Components/UI/ScrollToTop';
export default function NotFoundPage(){
 useEffect(()=>{
  const previousTitle=document.title;
  document.title='Página não encontrada | ComprasLocal';
  const previous=document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  const original=previous?.content;
  const robots=previous??document.createElement('meta');
  robots.name='robots';robots.content='noindex, follow';
  if(!previous)document.head.appendChild(robots);
  return()=>{document.title=previousTitle;if(previous)previous.content=original??'';else robots.remove();};
 },[]);
 return <DefaultTemplate><ScrollToTop/><Panel aria-labelledby="not-found-title"><Art aria-hidden="true"><span>4</span><Marker><FiMapPin/></Marker><span>4</span></Art><Eyebrow>ESTE CAMINHO NÃO LEVOU A UMA PÁGINA</Eyebrow><h1 id="not-found-title">Vamos encontrar outro caminho?</h1><p>A página que você procura não existe ou mudou de endereço.<br/>Você pode voltar ao início ou continuar descobrindo as lojas da sua cidade.</p><Actions><Primary to="/"><FiHome aria-hidden="true"/>Voltar ao início</Primary><Secondary to="/search">Explorar produtos<FiArrowRight aria-hidden="true"/></Secondary></Actions><small>Erro 404 · Página não encontrada</small></Panel></DefaultTemplate>;
}
const Panel=styled.section`display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center;min-height:430px;padding:48px 24px;background:white;border:1px solid #e3ecf2;border-radius:8px;color:#365c74;h1{font-size:clamp(24px,4vw,34px);line-height:1.3;margin:12px 0 18px;max-width:580px;}p{font-size:14px;line-height:1.9;color:#708896;max-width:570px;}small{font-size:11px;color:#8198a6;margin-top:30px;}@media(max-width:500px){padding:36px 18px;min-height:400px;p{font-size:13px;}}`;
const Art=styled.div`display:flex;align-items:center;gap:7px;font-size:100px;font-weight:750;line-height:1;color:#008ecc;margin-bottom:28px;letter-spacing:-5px;@media(max-width:500px){font-size:80px;}`;
const Marker=styled.div`width:85px;height:100px;border-radius:8px;background:#edf8fc;display:grid;place-items:center;transform:rotate(-6deg);border:1px solid #cde8f3;svg{font-size:55px;color:#ff922b;}@media(max-width:500px){width:70px;height:80px;svg{font-size:45px;}}`;
const Eyebrow=styled.span`font-size:10px;letter-spacing:1.4px;color:#7a95a6;line-height:1.8;`;
const Actions=styled.div`display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:28px;@media(max-width:450px){width:100%;flex-direction:column;}`;
const Primary=styled(Link)`display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:44px;padding:12px 20px;border-radius:6px;background:#008ecc;color:white;text-decoration:none;font-size:13px;font-weight:600;border:1px solid #008ecc;&:hover{background:#007db4;}&:focus-visible{outline:2px solid #008ecc;outline-offset:4px;}`;
const Secondary=styled(Primary)`background:white;color:#365c74;border-color:#d7e6ef;&:hover{background:#f4f9fc;}`;
