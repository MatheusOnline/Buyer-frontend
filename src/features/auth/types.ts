export type AuthUser = {name:string; email:string; cpf:string};
export type LoginCredentials = {email:string; password:string};
export type SessionResponse = {success:boolean; data:AuthUser};
export type RegisterCredentials = LoginCredentials & {firstname:string;lastname:string;phone:string;cpf:string};
export type RegisterValues = RegisterCredentials & {confirmPassword:string};
export type RegisterErrors = Partial<Record<keyof RegisterValues,string>>;
