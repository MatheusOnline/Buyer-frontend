import {useEffect,useRef,useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {passwordResetApi,type ResetChallenge,type ResetTicket} from '../api/passwordResetApi';
import {recoveryFailure,validateRecoveryCode,validateRecoveryEmail,validateRecoveryPassword,type ResetErrors} from '../utils/passwordResetValidation';
import {useAuth} from '../model/authStore';
export type RecoveryStep='email'|'code'|'password'|'success';
export function usePasswordReset(){
 const [step,setStep]=useState<RecoveryStep>('email'),[email,setEmail]=useState(''),[code,setCode]=useState(''),[password,setPassword]=useState(''),[confirmation,setConfirmation]=useState('');
 const [challenge,setChallenge]=useState<ResetChallenge|null>(null),[ticket,setTicket]=useState<ResetTicket|null>(null),[resendAt,setResendAt]=useState(0),[now,setNow]=useState(Date.now());
 const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[info,setInfo]=useState(''),[errors,setErrors]=useState<ResetErrors>({});
 const lock=useRef(false),alive=useRef(true);const client=useQueryClient();
 useEffect(()=>{alive.current=true;const timer=setInterval(()=>setNow(Date.now()),1000);return()=>{alive.current=false;clearInterval(timer);};},[]);
 const resendIn=Math.max(0,Math.ceil((resendAt-now)/1000));const codeExpired=!!challenge&&new Date(challenge.expires_at).getTime()<=now;const ticketExpired=!!ticket&&new Date(ticket.expires_at).getTime()<=now;
 function clearFeedback(){setMessage('');setInfo('');setErrors({});}
 async function run(action:()=>Promise<void>){if(lock.current)return;lock.current=true;setBusy(true);clearFeedback();try{await action();}catch(error){if(alive.current){const failure=recoveryFailure(error);setMessage(failure.message);setErrors(failure.fields);}}finally{lock.current=false;if(alive.current)setBusy(false);}}
 async function request(){const validation=validateRecoveryEmail(email);if(Object.keys(validation).length){setErrors(validation);return;}if(step!=='email'&&resendIn>0)return;await run(async()=>{const result=await passwordResetApi.request(email);if(!alive.current)return;setChallenge(result);setCode('');setPassword('');setConfirmation('');setTicket(null);setNow(Date.now());setResendAt(Date.now()+result.resend_after_seconds*1000);setStep('code');setInfo(result.message);});}
 async function verify(){const validation=validateRecoveryCode(code);if(Object.keys(validation).length){setErrors(validation);return;}if(!challenge||codeExpired)return;await run(async()=>{const result=await passwordResetApi.verify(challenge.challenge_id,code);if(!alive.current)return;setTicket(result);setCode('');setNow(Date.now());setStep('password');});}
 async function complete(){const validation=validateRecoveryPassword(password,confirmation);if(Object.keys(validation).length){setErrors(validation);return;}if(!ticket||!challenge||ticketExpired)return;await run(async()=>{await passwordResetApi.complete({challenge_id:challenge.challenge_id,resetToken:ticket.resetToken,password,confirmPassword:confirmation});if(!alive.current)return;useAuth.getState().logout();client.removeQueries({predicate:q=>!['products','product'].includes(String(q.queryKey[0]))});setPassword('');setConfirmation('');setTicket(null);setChallenge(null);setStep('success');});}
 function changeEmail(){if(lock.current)return;clearFeedback();setCode('');setPassword('');setConfirmation('');setTicket(null);setChallenge(null);setStep('email');}
 function updateEmail(value:string){setEmail(value);clearFeedback();}function updateCode(value:string){setCode(value.replace(/\D/g,'').slice(0,6));clearFeedback();}function updatePassword(value:string){setPassword(value);clearFeedback();}function updateConfirmation(value:string){setConfirmation(value);clearFeedback();}
 return {step,email,code,password,confirmation,busy,message,info,errors,resendIn,codeExpired,ticketExpired,request,verify,complete,changeEmail,updateEmail,updateCode,updatePassword,updateConfirmation};
}
export type PasswordResetFlow=ReturnType<typeof usePasswordReset>;
