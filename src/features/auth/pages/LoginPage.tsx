import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DefaultTemplate } from "../../../Template/DefaultTemplate";
import { ScrollToTop } from "../../../Components/UI/ScrollToTop";
import image from "../../../Assets/Svgs/Auth/login.svg";
import { LoginForm } from "../components/LoginForm";
import { Card, Eyebrow, Intro, Layout, SessionStatus, Story } from "../components/auth.styles";
import { useAuth } from "../model/authStore";
import { getLoginDestination } from "../utils/redirect";

export default function LoginPage() {
    const user = useAuth(state => state.user);
    const loading = useAuth(state => state.loading);
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const destination = getLoginDestination(params.get("redirect") ?? location.state?.from);
    if (!loading && user) return <Navigate to={destination} replace />;
    return <DefaultTemplate><ScrollToTop />{loading ? <SessionStatus role="status">Verificando sua sessão…</SessionStatus> : <Layout>
        <Story><Eyebrow>PERTO DE VOCÊ</Eyebrow><h2>Suas próximas descobertas começam aqui.</h2><p>Entre para salvar seus favoritos, acompanhar suas compras e descobrir o comércio local.</p><img src={image} alt="" /></Story>
        <Card aria-labelledby="login-title"><Eyebrow>SUA CONTA COMPRAS LOCAL</Eyebrow><h1 id="login-title">Que bom ter você aqui.</h1><Intro>Entre com seu e-mail e senha para continuar.</Intro><LoginForm registerUrl={destination === "/" ? "/auth/register" : `/auth/register?redirect=${encodeURIComponent(destination)}`} onSuccess={() => navigate(destination,{replace:true})} /></Card>
    </Layout>}</DefaultTemplate>;
}
