import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useLogin } from "./useLogin";
import { loginErrorMessage, validateLogin } from "../utils/loginValidation";
import type { LoginCredentials } from "../types";

export function useLoginForm(onSuccess:()=>void) {
    const [values,setValues] = useState<LoginCredentials>({email:"",password:""});
    const [errors,setErrors] = useState<ReturnType<typeof validateLogin>>({});
    const [message,setMessage] = useState("");
    const inFlight = useRef(false);
    const login = useLogin();
    function update(field:keyof LoginCredentials,value:string) {
        setValues(previous => ({...previous,[field]:value}));
        setErrors(previous => ({...previous,[field]:undefined}));
        setMessage("");
    }
    async function submit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (inFlight.current) return;
        const nextErrors = validateLogin(values);
        setErrors(nextErrors);setMessage("");
        const firstField = Object.keys(nextErrors)[0];
        if (firstField) {event.currentTarget.querySelector<HTMLInputElement>(`[name="${firstField}"]`)?.focus();return;}
        inFlight.current = true;
        try {
            await login.mutateAsync({email:values.email.trim().toLowerCase(),password:values.password});
            onSuccess();
        } catch (error) {setMessage(loginErrorMessage(error));}
        finally {inFlight.current = false;}
    }
    return {values,errors,message,update,submit,isPending:login.isPending};
}
