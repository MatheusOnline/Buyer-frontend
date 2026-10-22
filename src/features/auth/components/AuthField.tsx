import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Field, Label, Input, PasswordField, Toggle, FieldError, Hint } from "./auth.styles";
type Props = InputHTMLAttributes<HTMLInputElement> & {id:string;label:string;error?:string;hint?:string;password?:boolean};
export function AuthField({id,label,error,hint,password,...input}:Props) {
    const [visible,setVisible] = useState(false);
    const control = <Input {...input} id={id} type={password ? visible ? "text" : "password" : input.type} aria-invalid={!!error} aria-describedby={[error ? `${id}-error` : "",hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined} />;
    return <Field><Label htmlFor={id}>{label}</Label>{password ? <PasswordField>{control}<Toggle type="button" disabled={input.disabled} aria-label={`${visible ? "Ocultar" : "Mostrar"} ${label.toLowerCase()}`} aria-pressed={visible} onClick={() => setVisible(value => !value)}>{visible ? <FiEyeOff /> : <FiEye />}</Toggle></PasswordField> : control}{hint && <Hint id={`${id}-hint`}>{hint}</Hint>}{error && <FieldError id={`${id}-error`}>{error}</FieldError>}</Field>;
}
