import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DefaultTemplate } from "../../../Template/DefaultTemplate";
import { ScrollToTop } from "../../../Components/UI/ScrollToTop";
import image from "../../../Assets/Svgs/Auth/register.svg";
import {SocialLoginButtons} from '../components/SocialLoginButtons';
import { RegisterForm } from "../components/RegisterForm";
import { Eyebrow, Intro, RegisterCard, RegisterLayout, SessionStatus, Story } from "../components/auth.styles";
import { useAuth } from "../model/authStore";
import { getLoginDestination } from "../utils/redirect";
export default function RegisterPage() {
    const {user,loading} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const destination = getLoginDestination(params.get("redirect") ?? location.state?.from);
    const loginUrl = destination === "/" ? "/auth/login" : `/auth/login?redirect=${encodeURIComponent(destination)}`;
    if (!loading && user) return <Navigate to={destination} replace />;
    return <DefaultTemplate><ScrollToTop />{loading ? <SessionStatus role="status">Verificando sua sessão…</SessionStatus> : <RegisterLayout>
        <Story><Eyebrow>FAÇA PARTE DO COMÉRCIO LOCAL</Eyebrow><h2>Uma conta. Muitas descobertas por perto.</h2><p>Salve seus favoritos, acompanhe seus pedidos e encontre produtos nas lojas da sua cidade.</p><img src={image} alt="" /></Story>
        <RegisterCard aria-labelledby="register-title"><Eyebrow>SUA CONTA COMPRAS LOCAL</Eyebrow><h1 id="register-title">Comece por aqui.</h1><Intro>Crie sua conta com Google, Apple ou seu e-mail.</Intro><RegisterForm loginUrl={loginUrl} onSuccess={() => navigate(destination,{replace:true})} /><SocialLoginButtons destination={destination}/></RegisterCard>
    </RegisterLayout>}</DefaultTemplate>;
}
