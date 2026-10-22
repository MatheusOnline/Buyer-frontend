import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { AuthField } from "./AuthField";
import { Alert, FieldRow, Form, Signup, Submit } from "./auth.styles";
import { useRegisterForm } from "../hooks/useRegisterForm";
import type { RegisterValues } from "../types";
export function RegisterForm({onSuccess,loginUrl}:{onSuccess:()=>void;loginUrl:string}) {
    const form = useRegisterForm(onSuccess);
    const bind = (name:keyof RegisterValues) => ({name,value:form.values[name],error:form.errors[name],disabled:form.isPending,onChange:(event:React.ChangeEvent<HTMLInputElement>) => form.update(name,event.target.value)});
    return <Form noValidate onSubmit={form.submit} aria-busy={form.isPending}>
        <FieldRow><AuthField id="register-firstname" label="Nome" autoComplete="given-name" placeholder="Seu nome" maxLength={100} {...bind("firstname")} /><AuthField id="register-lastname" label="Sobrenome" autoComplete="family-name" placeholder="Seu sobrenome" maxLength={100} {...bind("lastname")} /></FieldRow>
        <AuthField id="register-email" label="E-mail" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} placeholder="seuemail@exemplo.com" maxLength={255} {...bind("email")} />
        <FieldRow><AuthField id="register-cpf" label="CPF" inputMode="numeric" placeholder="000.000.000-00" maxLength={14} {...bind("cpf")} /><AuthField id="register-phone" label="Celular" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(00) 00000-0000" maxLength={15} {...bind("phone")} /></FieldRow>
        <AuthField id="register-password" label="Senha" password autoComplete="new-password" placeholder="Crie sua senha" hint="Use pelo menos 8 caracteres." maxLength={255} {...bind("password")} />
        <AuthField id="register-confirmPassword" label="Confirmar senha" password autoComplete="new-password" placeholder="Digite a senha novamente" maxLength={255} {...bind("confirmPassword")} />
        {form.message && <Alert role="alert">{form.message}</Alert>}
        <Submit type="submit" disabled={form.isPending}>{form.isPending ? "Criando sua conta…" : "Criar minha conta"}<FiArrowRight aria-hidden="true" /></Submit>
        <Signup>Já tem uma conta? <Link to={loginUrl}>Entrar na minha conta</Link></Signup>
    </Form>;
}
