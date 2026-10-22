import { create } from "zustand";
import { api } from "../service/api";




interface user{
    name: string,
    email: string
    cpf: string
}

interface emailResponse {
    success: boolean;
    message: string;
}

interface codeResponse {
    success: boolean;
    message: string;
    token: string;
}

interface newPasswordResponse {
    success: boolean;
    message: string;
    user: user
}


interface ForgotPasswordProps {
    step: number;
    email: string;
    code: string;
    resetToken: string;

    nextStep: () => void;
    backStep: () => void;
    reset: () => void;

    emailFunction: (email: string) => Promise<emailResponse | undefined>;
    codeFunction: (code: string) => Promise<codeResponse | undefined>;
    newPasswordFunction: (password: string, token: string) => Promise<newPasswordResponse | undefined>;
    

    setEmail: (email: string) => void;
    setCode:    (code: string) => void
    setResetToken: (token: string) => void;

}

export const useForgotPasswordStore = create<ForgotPasswordProps>((set) => ({
    step: 0,
    email: "",
    code: "",
    resetToken: "",
    nextStep: () =>
        set((state) => ({
            step: state.step + 1,
        })),

    backStep: () =>
        set((state) => ({
            step: state.step - 1,
        })),

    reset: () =>
        set({
            step: 0,
            email: "",
        }),


    setEmail: (email) =>
        set({
            email,
        }),
    
    setCode: (code) =>
    set({
        code,
    }),

    setResetToken: (token) =>
    set({
        resetToken: token,
    }),
    


    emailFunction: async (email: string) => {
        try{
            const {data} = await api.post("/auth/email",{email})
            return data
        }catch(error){
            console.log(error)
        }
    
    },

    codeFunction: async (code: string) => {
        try{
            const {data} = await api.post("/auth/code",{code})

             set({
                resetToken: data.resetToken,
            });
            return data
        }catch(error){
            console.log(error)
        }
    
    },

    newPasswordFunction: async (password: string, resetToken: string) => {
        try{
            const {data} = await api.post("/auth/newpassword",{ password,resetToken})
            console.log(data)
            return data
        }catch(error){
            console.log(error)
        }
    
    }
}));