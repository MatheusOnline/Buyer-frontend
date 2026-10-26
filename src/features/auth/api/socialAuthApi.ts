import {api} from '../../../service/api';
import type {SessionResponse} from '../types';
import {getLoginDestination} from '../utils/redirect';
export type SocialProvider='google'|'apple';
export type SocialPending={provider:SocialProvider;kind:'register'|'link';email:string;firstname:string;lastname:string;requires_password:boolean;destination:string};
export const socialAuthApi={
 async providers(){return (await api.get<{success:boolean;data:Record<SocialProvider,boolean>}>('/oauth/providers')).data.data;},
 startUrl(provider:SocialProvider,destination:string){return `${api.defaults.baseURL}/oauth/${provider}?redirect=${encodeURIComponent(getLoginDestination(destination))}`;},
 async pending(){return (await api.get<{success:boolean;data:SocialPending}>('/oauth/pending')).data.data;},
 async complete(values:Record<string,string>){return (await api.post<SessionResponse&{destination:string}>('/oauth/complete',values)).data;},
};
