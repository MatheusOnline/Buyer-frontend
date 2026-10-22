import axios from "axios";
import type { LoginCredentials } from "../types";
export function validateLogin(values:LoginCredentials) {
    const errors:{email?:string;password?:string} = {};
    if (!values.email.trim()) errors.email = "Informe seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Informe um e-mail válido.";
    if (!values.password) errors.password = "Informe sua senha.";
    return errors;
}
export function loginErrorMessage(error:unknown) {
    if (axios.isAxiosError(error)) {
        if (!error.response) return "Não foi possível conectar. Verifique sua conexão e tente novamente.";
        if (error.response.status === 401 || error.response.data?.code === "INVALID_CREDENTIALS") return "E-mail ou senha incorretos. Confira seus dados e tente novamente.";
        if (error.response.status === 429) return "Muitas tentativas. Aguarde um pouco antes de tentar novamente.";
    }
    return "Não foi possível entrar agora. Tente novamente em instantes.";
}
