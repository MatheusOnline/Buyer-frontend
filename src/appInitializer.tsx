import { useEffect } from "react";
import { useAuth } from "./features/auth/model/authStore.ts";
export function AppInitializer() {
    const fetchUser = useAuth(state => state.fetchUser);
    useEffect(() => {void fetchUser();}, [fetchUser]);
    return null;
}
