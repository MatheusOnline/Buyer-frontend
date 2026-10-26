import {api} from '../../../service/api';
export type ResetChallenge={challenge_id:string;expires_at:string;resend_after_seconds:number;message:string};
export type ResetTicket={resetToken:string;expires_at:string};
export const passwordResetApi={
 async request(email:string){const result=(await api.post<{success:boolean;data:ResetChallenge}>('/auth/email',{email:email.trim().toLowerCase()})).data;if(!result.success||!result.data?.challenge_id)throw new Error('Invalid recovery response');return result.data;},
 async verify(challenge_id:string,code:string){const result=(await api.post<{success:boolean;data:ResetTicket}>('/auth/code',{challenge_id,code})).data;if(!result.success||!result.data?.resetToken)throw new Error('Invalid recovery response');return result.data;},
 async complete(values:{challenge_id:string;resetToken:string;password:string;confirmPassword:string}){const result=(await api.post<{success:boolean;data:{changed:boolean}}>('/auth/newpassword',values)).data;if(!result.success||!result.data?.changed)throw new Error('Invalid recovery response');return result.data;},
};
