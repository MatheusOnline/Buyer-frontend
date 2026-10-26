import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowUpRight, FiHeart, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import Logo from "@assets/Img/Logos/PrimaryLogo.webp";
import { useAuth } from "../../../stores/useAuthStore";

export const Header = () => {
    const user = useAuth(state => state.user);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const query = params.get("q") ?? "";
    const [draft, setDraft] = useState({query, value: query});
    const search = draft.query === query ? draft.value : query;
    return <>
        <TopLine><span>Pequenas distâncias. Grandes descobertas.</span><span>Valorize o comércio local <FiArrowUpRight aria-hidden="true" /></span></TopLine>
        <ContainerHeader>
            <HeaderInner>
                <Brand to="/" aria-label="Compras Local — início"><img src={Logo} alt="Compras Local" /></Brand>
                <SearchForm role="search" onSubmit={event => {event.preventDefault(); navigate(search.trim() ? `/search?q=${encodeURIComponent(search.trim())}` : "/search");}}>
                    <FiSearch aria-hidden="true" /><input aria-label="Buscar produtos" placeholder="O que você está procurando hoje?" value={search} onChange={event => setDraft({query, value: event.target.value})} />
                    <button type="submit" aria-label="Buscar"><FiSearch /></button>
                </SearchForm>
                <Actions aria-label="Sua conta e compras">
                    <Link to="/profile" aria-label={user ? "Minha conta" : "Entrar ou cadastrar-se"}><FiUser /><span><small>{user ? "Olá, boas compras!" : "Boas-vindas!"}</small>{user ? "Minha conta" : "Entre ou cadastre-se"}</span></Link>
                    <IconLink to="/favorites" aria-label="Favoritos"><FiHeart /></IconLink>
                    <IconLink to="/cart" aria-label="Carrinho"><FiShoppingBag /></IconLink>
                </Actions>
            </HeaderInner>
            <Nav aria-label="Navegação principal"><Link to="/search">Explorar produtos</Link><Link to="/search?department=fashion">Moda</Link><Link to="/search?department=home">Casa e decoração</Link><Link to="/search?department=electronics">Eletrônicos</Link><Link to="/search?department=sports">Esportes</Link><span>Encontre. Descubra. Compre local.</span></Nav>
        </ContainerHeader>
    </>;
};
const TopLine = styled.div`
    background: #073d56; color: #d4edf6; padding: 8px max(32px, calc((100% - 1280px) / 2)); display: flex; justify-content: space-between; gap: 12px; font-size: 11px;
    span { display: flex; align-items: center; gap: 5px; }
    @media (max-width: 700px) { padding: 8px 16px; justify-content: center; span:last-child { display: none; } }
`;
const ContainerHeader = styled.header`
    background: white; border-bottom: 1px solid #e8edf1;
    a { text-decoration: none; color: #304b59; }
    a:focus-visible, button:focus-visible { outline: 2px solid #008ecc; outline-offset: 4px; border-radius: 6px; }
`;
const HeaderInner = styled.div`
    max-width: 1344px; margin: auto; padding: 22px 32px; display: grid; grid-template-columns: 165px minmax(160px, 1fr) auto; gap: 36px; align-items: center;
    @media (max-width: 1000px) { gap: 20px; grid-template-columns: 135px minmax(120px, 1fr) auto; }
    @media (max-width: 700px) { padding: 16px; grid-template-columns: 1fr auto; gap: 16px; }
`;
const Brand = styled(Link)`
    display: inline-flex; align-items: center; img { width: 145px; height: auto; } @media (max-width: 700px) { img { width: 124px; } }
`;
const SearchForm = styled.form`
    display: flex; align-items: center; gap: 12px; padding: 5px 5px 5px 16px; border: 1px solid #e1e8ed; background: #f7f9fb; border-radius: 6px; color: #778d99; min-width: 0;
    &:focus-within { border-color: #008ecc; box-shadow: 0 0 0 3px #e4f5fc; }
    > svg { flex-shrink: 0; width: 18px; height: 18px; }
    input { width: 100%; min-width: 0; height: 36px; border: 0; outline: 0; background: transparent; color: #223c4a; font-size: 13px; }
    button { display: grid; place-items: center; width: 38px; height: 38px; border: 0; background: #008ecc; color: white; border-radius: 6px; cursor: pointer; flex-shrink: 0; }
    @media (max-width: 700px) { grid-column: 1 / -1; grid-row: 2; }
`;
const Actions = styled.nav`
    display: flex; align-items: center; gap: 20px;
    a { display: inline-flex; align-items: center; gap: 9px; font-size: 12px; font-weight: 600; white-space: nowrap; }
    svg { width: 21px; height: 21px; }
    small { display: block; font-size: 10px; font-weight: 400; color: #788a96; margin-bottom: 4px; }
    @media (max-width: 1100px) { a > span { display: none; } gap: 16px; }
`;
const IconLink = styled(Link)`padding: 5px;`;
const Nav = styled.nav`
    max-width: 1344px; margin: auto; padding: 0 32px 15px; display: flex; align-items: center; gap: 28px; font-size: 12px; overflow-x: auto; scrollbar-width: none; &::-webkit-scrollbar { display: none; }
    a { flex-shrink: 0; } a:hover { color: #008ecc; } a:first-child { font-weight: 600; }
    span { margin-left: auto; color: #8b9ba6; font-size: 11px; white-space: nowrap; }
    @media (max-width: 900px) { span { display: none; } }
    @media (max-width: 700px) { padding: 0 16px 14px; gap: 22px; font-size: 11px; }
`;
