import axios from 'axios';
export type ResetErrors={email?:string;code?:string;password?:string;confirmPassword?:string};
export function validateRecoveryEmail(email:string):ResetErrors{return !email.trim()||email.trim().length>255||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())?{email:'Informe um e-mail válido.'}:{};}
export function validateRecoveryCode(code:string):ResetErrors{return /^\d{6}$/.test(code)?{}:{code:'Digite os 6 números do código recebido.'};}
export function validateRecoveryPassword(password:string,confirmation:string):ResetErrors{const errors:ResetErrors={};if(password.length<8)errors.password='Use pelo menos 8 caracteres.';else if(new TextEncoder().encode(password).length>72)errors.password='Use uma senha de até 72 bytes; emojis e acentos podem ocupar mais de um byte.';if(!confirmation)errors.confirmPassword='Confirme sua nova senha.';else if(password!==confirmation)errors.confirmPassword='As senhas precisam ser iguais.';return errors;}
export function recoveryFailure(error:unknown):{message:string;fields:ResetErrors}{
 if(axios.isAxiosError(error)){if(!error.response)return {message:'Não foi possível conectar. Confira sua internet e tente novamente.',fields:{}};
  if(error.response.status===429)return {message:'Muitas tentativas ou solicitações. Aguarde antes de tentar novamente.',fields:{}};
  switch(error.response.data?.code){case 'RESET_EMAIL_INVALID':return {message:'Confira o e-mail informado.',fields:{email:'Informe um e-mail válido.'}};case 'RESET_CODE_INVALID':return {message:'Código inválido ou expirado. Confira o último e-mail ou solicite um novo código.',fields:{code:'Confira os 6 números do último código recebido.'}};case 'RESET_TICKET_INVALID':return {message:'O prazo para trocar a senha acabou ou este acesso já foi usado. Solicite um novo código.',fields:{}};case 'RESET_PASSWORD_REUSED':return {message:'Escolha uma senha diferente da anterior.',fields:{password:'Esta senha já está em uso na sua conta.'}};case 'RESET_PASSWORD_INVALID':return {message:'Confira as regras da nova senha.',fields:{password:'Use pelo menos 8 caracteres e no máximo 72 bytes.'}};case 'RESET_PASSWORD_MISMATCH':return {message:'Confira a confirmação da senha.',fields:{confirmPassword:'As senhas precisam ser iguais.'}};}
 }
 return {message:'Não foi possível concluir a recuperação agora. Tente novamente em instantes.',fields:{}};
}
