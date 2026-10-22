import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../model/authStore";
export function RequireAuth() {
    const {user,loading} = useAuth();
    const location = useLocation();
    if (loading) return <p role="status">Verificando sua sessão…</p>;
    if (!user) return <Navigate to="/auth/login" state={{from:location.pathname + location.search + location.hash}} replace />;
    return <Outlet />;
}
