import { create } from "zustand";
import { authApi } from "../api/authApi";
import type { AuthUser } from "../types";

type AuthStore = {
    user:AuthUser | null; loading:boolean;
    fetchUser:()=>Promise<void>; setUser:(user:AuthUser | null)=>void; logout:()=>void;
};
let revision = 0;
let pending:Promise<void> | undefined;
export const useAuth = create<AuthStore>(set => ({
    user:null, loading:true,
    setUser:user => {revision++;set({user,loading:false});},
    logout:() => {revision++;set({user:null,loading:false});},
    fetchUser:() => {
        if (pending) return pending;
        const requestRevision = revision;
        pending = authApi.me().then(result => {
            if (revision === requestRevision) set({user:result.data,loading:false});
        }).catch(() => {
            if (revision === requestRevision) set({user:null,loading:false});
        }).finally(() => {pending = undefined;});
        return pending;
    },
}));
