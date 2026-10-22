import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginForm } from "../hooks/useLoginForm";
import { Form, Field, Label, Input, PasswordField, Toggle, FieldError, Alert, Submit, FormLinks, Signup } from "./auth.styles";

export function LoginForm({onSuccess,registerUrl = "/auth/register"}: {onSuccess:()=>void;registerUrl?:string}) {
    const form = useLoginForm(onSuccess);
    const [visible,setVisible] = useState(false);
    return <Form onSubmit={form.submit} noValidate aria-busy={form.isPending}>
        <Field><Label htmlFor="login-email">E-mail</Label><Input id="login-email" name="email" type="email" inputMode="email" autoComplete="username" autoCapitalize="none" spellCheck={false} placeholder="seuemail@exemplo.com" value={form.values.email} disabled={form.isPending} aria-invalid={!!form.errors.email} aria-describedby={form.errors.email ? "login-email-error" : undefined} onChange={event => form.update("email",event.target.value)} />{form.errors.email && <FieldError id="login-email-error">{form.errors.email}</FieldError>}</Field>
        <Field><Label htmlFor="login-password">Senha</Label><PasswordField><Input id="login-password" name="password" type={visible ? "text" : "password"} autoComplete="current-password" placeholder="Digite sua senha" value={form.values.password} disabled={form.isPending} aria-invalid={!!form.errors.password} aria-describedby={form.errors.password ? "login-password-error" : undefined} onChange={event => form.update("password",event.target.value)} /><Toggle type="button" aria-label={visible ? "Ocultar senha" : "Mostrar senha"} aria-pressed={visible} onClick={() => setVisible(value => !value)}>{visible ? <FiEyeOff /> : <FiEye />}</Toggle></PasswordField>{form.errors.password && <FieldError id="login-password-error">{form.errors.password}</FieldError>}</Field>
        <FormLinks><Link to="/auth/forgot-password">Esqueci minha senha</Link></FormLinks>
        {form.message && <Alert role="alert">{form.message}</Alert>}
        <Submit type="submit" disabled={form.isPending}>{form.isPending ? "Entrando…" : "Entrar na minha conta"}<FiArrowRight aria-hidden="true" /></Submit>
        <Signup>Primeira vez por aqui? <Link to={registerUrl}>Criar uma conta</Link></Signup>
    </Form>;
}
