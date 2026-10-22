import axios from "axios";
import type { RegisterCredentials, RegisterErrors, RegisterValues } from "../types";
const digits = (value:string) => value.replace(/\D/g, "");
export function formatCpf(value:string) {
    return digits(value).slice(0,11).replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2");
}
export function formatPhone(value:string) {
    return digits(value).slice(0,11).replace(/^(\d{2})(\d)/,"($1) $2").replace(/(\d{5})(\d{1,4})$/,"$1-$2");
}
export function isValidCpf(value:string) {
    const cpf = digits(value);
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    for (let length = 9; length <= 10; length++) {
        const sum = [...cpf.slice(0,length)].reduce((total,digit,index) => total + Number(digit) * (length + 1 - index),0);
        const check = (sum * 10 % 11) % 10;
        if (check !== Number(cpf[length])) return false;
    }
    return true;
}
export function validateRegister(values:RegisterValues):RegisterErrors {
    const errors:RegisterErrors = {};
    if (!values.firstname.trim()) errors.firstname = "Informe seu nome.";
    else if (values.firstname.trim().length > 100) errors.firstname = "Use até 100 caracteres.";
    if (!values.lastname.trim()) errors.lastname = "Informe seu sobrenome.";
    else if (values.lastname.trim().length > 100) errors.lastname = "Use até 100 caracteres.";
    if (!values.email.trim()) errors.email = "Informe seu e-mail.";
    else if (values.email.trim().length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Informe um e-mail válido.";
    if (!isValidCpf(values.cpf)) errors.cpf = "Informe um CPF válido.";
    if (digits(values.phone).length !== 11) errors.phone = "Informe seu celular com DDD e 11 dígitos.";
    if (values.password.length < 8) errors.password = "Sua senha deve ter pelo menos 8 caracteres.";
    else if (values.password.length > 255) errors.password = "Use até 255 caracteres.";
    if (!values.confirmPassword) errors.confirmPassword = "Confirme sua senha.";
    else if (values.confirmPassword !== values.password) errors.confirmPassword = "As senhas precisam ser iguais.";
    return errors;
}
export function registerPayload(values:RegisterValues):RegisterCredentials {
    return {firstname:values.firstname.trim(),lastname:values.lastname.trim(),email:values.email.trim().toLowerCase(),cpf:digits(values.cpf),phone:digits(values.phone),password:values.password};
}
export function registerFailure(error:unknown):{message:string;fields:RegisterErrors} {
    if (axios.isAxiosError(error)) {
        if (!error.response) return {message:"Não foi possível conectar. Verifique sua conexão e tente novamente.",fields:{}};
        const code = error.response.data?.code;
        if (code === "EMAIL_ALREADY_EXISTS") return {message:"Este e-mail já tem uma conta. Entre ou recupere sua senha.",fields:{email:"E-mail já cadastrado."}};
        if (code === "CPF_ALREADY_EXISTS") return {message:"Este CPF já tem uma conta. Entre ou recupere sua senha.",fields:{cpf:"CPF já cadastrado."}};
        if (error.response.status === 429) return {message:"Muitas tentativas. Aguarde um pouco antes de tentar novamente.",fields:{}};
        if (code === "INVALID_FIELDS") {
            const fields:RegisterErrors = {};
            const messages = error.response.data?.errors;
            for (const field of ["firstname","lastname","email","cpf","phone","password"] as const) {
                if (Array.isArray(messages?.[field]) && typeof messages[field][0] === "string") fields[field] = messages[field][0];
            }
            return {message:"Confira os dados informados e tente novamente.",fields};
        }
    }
    return {message:"Não foi possível criar sua conta agora. Tente novamente em instantes.",fields:{}};
}
