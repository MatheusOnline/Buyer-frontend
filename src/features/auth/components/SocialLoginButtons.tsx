import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import styled from 'styled-components';
import {FcGoogle} from 'react-icons/fc';
import {FaApple} from 'react-icons/fa';
import {socialAuthApi,type SocialProvider} from '../api/socialAuthApi';
const Group=styled.div`display:flex;flex-direction:column;gap:12px;margin-top:22px;`;
const SocialButton=styled.button<{$apple?:boolean}>`position:relative;display:flex;align-items:center;justify-content:center;gap:12px;min-height:48px;width:100%;border:1px solid ${p=>p.$apple?'#171717':'#dce5eb'};border-radius:6px;background:${p=>p.$apple?'#171717':'white'};color:${p=>p.$apple?'white':'#344858'};font-size:14px;font-weight:500;cursor:pointer;svg{font-size:21px;position:absolute;left:16px;}&:hover:not(:disabled){filter:brightness(.96);}&:focus-visible{outline:3px solid #008ecc;outline-offset:3px;}&:disabled{opacity:.5;cursor:not-allowed;}`;
const Divider=styled.div`display:flex;align-items:center;gap:14px;color:#8999a3;font-size:11px;margin:6px 0 0;&::before,&::after{content:'';flex:1;height:1px;background:#e4ebf0;}`;
const Status=styled.p`font-size:11px;line-height:1.6;color:#7b8c97;margin:0;text-align:center;`;
export function SocialLoginButtons({destination}:{destination:string}){
 const providers=useQuery({queryKey:['social-providers'],queryFn:socialAuthApi.providers,staleTime:60000,retry:1});
 const [starting,setStarting]=useState<SocialProvider|null>(null);
 function start(provider:SocialProvider){setStarting(provider);window.location.assign(socialAuthApi.startUrl(provider,destination));}
 return <Group aria-label="Acessar com uma conta social"><Divider>ou entre com sua conta social</Divider><SocialButton type="button" disabled={!providers.data?.google||!!starting} onClick={()=>start('google')}><FcGoogle aria-hidden="true"/>{starting==='google'?'Conectando ao Google…':'Continuar com o Google'}</SocialButton><SocialButton type="button" $apple disabled={!providers.data?.apple||!!starting} onClick={()=>start('apple')}><FaApple aria-hidden="true"/>{starting==='apple'?'Conectando à Apple…':'Continuar com a Apple'}</SocialButton>{providers.isPending?<Status role="status">Verificando opções de acesso…</Status>:providers.isError?<Status>Não foi possível carregar o acesso social. Use seu e-mail e senha.</Status>:(!providers.data?.google||!providers.data?.apple)&&<Status>{!providers.data?.google&&!providers.data?.apple?'O acesso com Google e Apple estará disponível em breve.':!providers.data?.apple?'O acesso com Apple estará disponível em breve.':'O acesso com Google estará disponível em breve.'}</Status>}</Group>;
}
