import {useState} from 'react';
import {Link,Outlet,useNavigate} from 'react-router-dom';
import {FiChevronRight,FiGrid,FiLogOut,FiMapPin,FiShoppingBag} from 'react-icons/fi';
import {DefaultTemplate} from '../../../Template/DefaultTemplate';
import {ScrollToTop} from '../../../Components/UI/ScrollToTop';
import {useAuth} from '../../auth/model/authStore';
import {useLogout} from '../../../service/authService';
import {initials} from '../utils/profileForm';
import {Avatar,Breadcrumb,Content,Feedback,Heading,Identity,Logout,Nav,Navigation,Shell,Sidebar} from '../components/profile.styles';
export default function ProfileLayout() {
    const user=useAuth(state=>state.user);
    const logout=useLogout();
    const navigate=useNavigate();
    const [failed,setFailed]=useState(false);
    async function signOut() {
        setFailed(false);
        try{await logout.mutateAsync();navigate('/auth/login',{replace:true});}
        catch{setFailed(true);}
    }
    return <DefaultTemplate><ScrollToTop/><Breadcrumb aria-label="Navegação da conta"><Link to="/">Início</Link><FiChevronRight/><span>Minha conta</span></Breadcrumb>
        <Heading><small>SEU ESPAÇO NO COMPRAS LOCAL</small><h1>Minha conta</h1><p>Cuide dos seus dados e encontre tudo sobre suas compras em um só lugar.</p></Heading>
        <Shell><Sidebar aria-label="Menu da conta"><Identity><Avatar aria-hidden="true">{initials(user?.name??'')}</Avatar><div><strong>{user?.name||'Sua conta'}</strong><span>Bem-vindo ao seu espaço</span></div></Identity>
            <Navigation aria-label="Seções da conta"><Nav to="/profile" end><FiGrid/>Visão geral</Nav><Nav to="/profile/orders"><FiShoppingBag/>Minhas compras</Nav><Nav to="/profile/address"><FiMapPin/>Meus endereços</Nav></Navigation>
            <Logout type="button" onClick={signOut} disabled={logout.isPending}><FiLogOut/>{logout.isPending?'Saindo…':'Sair da conta'}</Logout>{failed&&<Feedback role="alert" $error>Não foi possível sair. Tente novamente.</Feedback>}
        </Sidebar><Content><Outlet/></Content></Shell>
    </DefaultTemplate>;
}
