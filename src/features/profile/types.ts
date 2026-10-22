export type Profile = {id:string;firstname:string;lastname:string;email:string;phone:string;cpf:string};
export type ProfileDraft = Pick<Profile,'firstname'|'email'|'phone'>;
export type ProfileErrors = Partial<Record<keyof ProfileDraft,string>>;
export type ProfileResponse = {success:boolean;data:Profile};
export type ProfileUpdateResponse = {success:boolean;data:Omit<Profile,'lastname'|'cpf'>};
