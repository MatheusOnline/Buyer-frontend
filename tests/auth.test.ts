import { formatCpf, formatPhone, isValidCpf, registerFailure, registerPayload, validateRegister } from "../src/features/auth/utils/registerValidation";
import { describe, expect, it, vi } from 'vitest';
import { AxiosError } from 'axios';
import { validateLogin, loginErrorMessage } from '../src/features/auth/utils/loginValidation';
import { getLoginDestination } from '../src/features/auth/utils/redirect';
import { authApi } from '../src/features/auth/api/authApi';
import { useAuth } from '../src/features/auth/model/authStore';

describe('login validation and recovery', () => {
    it('reports both empty fields and accepts a valid email without modifying the password', () => {
        expect(validateLogin({email:'',password:''})).toEqual({email:'Informe seu e-mail.',password:'Informe sua senha.'});
        expect(validateLogin({email:'  pessoa@example.com ',password:' senha com espaços '})).toEqual({});
        expect(validateLogin({email:'inválido',password:'senha'}).email).toBeTruthy();
    });
    it('handles network errors, invalid credentials, throttling and unexpected errors', () => {
        const network = new AxiosError('network');
        expect(loginErrorMessage(network)).toContain('conexão');
        expect(loginErrorMessage({isAxiosError:true,response:{status:401}})).toContain('incorretos');
        expect(loginErrorMessage({isAxiosError:true,response:{status:429}})).toContain('Muitas tentativas');
        expect(loginErrorMessage(new Error('private server details'))).not.toContain('private server');
    });
});
describe('return destination', () => {
    it('preserves internal pages, parameters and anchors', () => {
        expect(getLoginDestination('/cart')).toBe('/cart');
        expect(getLoginDestination('/search?q=fone#produtos')).toBe('/search?q=fone#produtos');
    });
    it('rejects external redirects, malformed paths and authentication loops', () => {
        for (const path of [null,{},'https://evil.test','//evil.test','/\\evil.test','/auth/login','/auth/register','/a/../auth/login']) {
            expect(getLoginDestination(path)).toBe('/');
        }
    });
});
describe('session initialization', () => {
    it('shares the initial request and prevents a late response from replacing a new login', async () => {
        let finish!:(value:Awaited<ReturnType<typeof authApi.me>>)=>void;
        const request = new Promise<Awaited<ReturnType<typeof authApi.me>>>(resolve => {finish = resolve;});
        const spy = vi.spyOn(authApi,'me').mockReturnValue(request);
        const first = useAuth.getState().fetchUser();
        const second = useAuth.getState().fetchUser();
        expect(first).toBe(second);
        const current = {name:'Atual',email:'atual@example.com',cpf:''};
        useAuth.getState().setUser(current);
        finish({success:true,data:{name:'Antigo',email:'antigo@example.com',cpf:''}});
        await first;
        expect(useAuth.getState().user).toEqual(current);
        expect(useAuth.getState().loading).toBe(false);
        spy.mockRestore();
    });
    it('finishes loading when no valid session exists', async () => {
        const spy = vi.spyOn(authApi,'me').mockRejectedValue(new Error('Unauthorized'));
        await useAuth.getState().fetchUser();
        expect(useAuth.getState().user).toBeNull();
        expect(useAuth.getState().loading).toBe(false);
        spy.mockRestore();
    });
});


describe('registration validation and payload', () => {
    const valid = {firstname:' Ana ',lastname:' Silva ',email:' ANA@EXAMPLE.COM ',cpf:'111.444.777-35',phone:'(11) 99999-9999',password:' senha123 ',confirmPassword:' senha123 '};
    it('accepts a valid registration and normalizes only identity fields', () => {
        expect(validateRegister(valid)).toEqual({});
        expect(registerPayload(valid)).toEqual({firstname:'Ana',lastname:'Silva',email:'ana@example.com',cpf:'11144477735',phone:'11999999999',password:' senha123 '});
        expect(registerPayload(valid)).not.toHaveProperty('confirmPassword');
    });
    it('rejects repeated and incorrect CPF check digits', () => {
        expect(isValidCpf('11111111111')).toBe(false);
        expect(isValidCpf('11144477734')).toBe(false);
        expect(validateRegister({...valid,cpf:'123'}).cpf).toBeTruthy();
    });
    it('validates confirmation, password length and the mobile contract', () => {
        expect(validateRegister({...valid,password:'short'}).password).toBeTruthy();
        expect(validateRegister({...valid,confirmPassword:'different'}).confirmPassword).toBeTruthy();
        expect(validateRegister({...valid,phone:'1133334444'}).phone).toBeTruthy();
    });
    it('masks pasted digits, supports deletion and bounds the length', () => {
        expect(formatCpf('111444777351234')).toBe('111.444.777-35');
        expect(formatCpf('111.444.777-3')).toBe('111.444.777-3');
        expect(formatCpf('')).toBe('');
        expect(formatPhone('119999999991234')).toBe('(11) 99999-9999');
        expect(formatPhone('')).toBe('');
    });
    it('maps duplicate accounts and field errors without exposing unknown server errors', () => {
        expect(registerFailure({isAxiosError:true,response:{status:409,data:{code:'EMAIL_ALREADY_EXISTS'}}}).fields.email).toBeTruthy();
        expect(registerFailure({isAxiosError:true,response:{status:409,data:{code:'CPF_ALREADY_EXISTS'}}}).fields.cpf).toBeTruthy();
        expect(registerFailure({isAxiosError:true,response:{status:400,data:{code:'INVALID_FIELDS',errors:{phone:['Celular inválido.']}}}}).fields.phone).toBe('Celular inválido.');
        expect(registerFailure({isAxiosError:true}).message).toContain('conexão');
        expect(registerFailure(new Error('private details')).message).not.toContain('private');
    });
});
