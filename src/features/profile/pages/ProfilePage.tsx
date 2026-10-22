import {Link} from 'react-router-dom';
import {FiArrowRight,FiHeart,FiLock,FiMapPin,FiShoppingBag} from 'react-icons/fi';
import {Skeleton} from '../../../Components/UI/Skeleton/Skeleton';
import {useProfile} from '../hooks/useProfile';
import {ProfileForm} from '../components/ProfileForm';
import {Button,Feedback,Panel,Security,Shortcut,Shortcuts} from '../components/profile.styles';
export default function ProfilePage() {
    const query=useProfile();
    return <><Shortcuts><Shortcut to="/profile/orders"><FiShoppingBag/><div><strong>Minhas compras</strong><span>Acompanhe seus pedidos</span></div><FiArrowRight/></Shortcut><Shortcut to="/profile/address"><FiMapPin/><div><strong>Meus endereços</strong><span>Organize suas entregas</span></div><FiArrowRight/></Shortcut><Shortcut to="/favorites"><FiHeart/><div><strong>Favoritos</strong><span>Reveja seus achados</span></div><FiArrowRight/></Shortcut></Shortcuts>
        {query.isLoading?<div aria-busy="true" aria-label="Carregando seus dados"><Skeleton height="470px"/></div>:query.data?.data?<>{query.isError&&<Feedback role="alert" $error>Não foi possível atualizar os dados. Confira sua conexão antes de salvar novas alterações.</Feedback>}<ProfileForm key={query.data.data.id} profile={query.data.data}/></>:<Panel><h2>Não foi possível carregar seus dados</h2><p>Verifique sua conexão e tente novamente.</p><Button type="button" disabled={query.isFetching} onClick={()=>query.refetch()}>{query.isFetching?'Carregando…':'Tentar novamente'}</Button></Panel>}
        <Security><div><FiLock/><div><h2>Segurança da conta</h2><p>Para criar uma nova senha, siga as etapas de recuperação pelo seu e-mail.</p></div></div><Link to="/auth/forgot-password">Redefinir senha <FiArrowRight/></Link></Security>
    </>;
}
