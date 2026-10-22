export type SavedAddress={id:string;label:string;is_default:boolean;city:string;street:string;number:string;postal_code:string;district:string;reference:string|null;complement:string|null};
export type AddressValues=Omit<SavedAddress,'id'|'reference'|'complement'>&{reference:string;complement:string};
export type AddressResponse={success:boolean;data:SavedAddress};
