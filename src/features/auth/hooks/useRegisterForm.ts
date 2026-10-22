import { useRef, useState } from "react";
import type { FormEvent } from "react";
import type { RegisterErrors, RegisterValues } from "../types";
import { useRegister } from "./useRegister";
import { formatCpf, formatPhone, registerFailure, registerPayload, validateRegister } from "../utils/registerValidation";
const empty:RegisterValues = {firstname:"",lastname:"",email:"",cpf:"",phone:"",password:"",confirmPassword:""};
export function useRegisterForm(onSuccess:()=>void) {
    const [values,setValues] = useState(empty);
    const [errors,setErrors] = useState<RegisterErrors>({});
    const [message,setMessage] = useState("");
    const pending = useRef(false);
    const mutation = useRegister();
    function update(field:keyof RegisterValues,value:string) {
        setValues(previous => ({...previous,[field]:field === "cpf" ? formatCpf(value) : field === "phone" ? formatPhone(value) : value}));
        setErrors(previous => ({...previous,[field]:undefined,...(field === "password" ? {confirmPassword:undefined} : {})}));
        setMessage("");
    }
    async function submit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (pending.current) return;
        const form = event.currentTarget;
        const focusError = (fields:RegisterErrors) => {
            const first = Object.keys(fields)[0];
            if (first) form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
        };
        const nextErrors = validateRegister(values);
        setErrors(nextErrors);setMessage("");
        if (Object.keys(nextErrors).length) {focusError(nextErrors);return;}
        pending.current = true;
        try {await mutation.mutateAsync(registerPayload(values));onSuccess();}
        catch(error) {
            const failure = registerFailure(error);
            setErrors(failure.fields);setMessage(failure.message);focusError(failure.fields);
        } finally {pending.current = false;}
    }
    return {values,errors,message,update,submit,isPending:mutation.isPending};
}
