import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiHeart, FiMail, FiPhone } from "react-icons/fi";
export function Footer() {
    return <FooterStyled><FooterInner>
        <div><Brand to="/">Compras<span>Local.</span></Brand><p>Novas descobertas. Lojas da sua cidade.<br />Um jeito mais próximo de comprar.</p></div>
        <div><h3>Explore</h3><Link to="/search">Todos os produtos</Link><Link to="/search?department=fashion">Moda</Link><Link to="/search?department=home">Casa e decoração</Link></div>
        <div><h3>Seu espaço</h3><Link to="/profile">Minha conta</Link><Link to="/favorites">Meus favoritos</Link><Link to="/cart">Meu carrinho</Link></div>
        <div><h3>Fale com a gente</h3><a href="tel:+5544999093250"><FiPhone /> (44) 99909-3250</a><a href="mailto:matheus.francisco20021@gmail.com"><FiMail /> Enviar um e-mail</a><p>Umuarama · Paraná</p></div>
    </FooterInner><FooterBottom><span>© {new Date().getFullYear()} Compras Local. Todos os direitos reservados.</span><span>Feito para aproximar <FiHeart /></span></FooterBottom></FooterStyled>;
}
const FooterStyled = styled.footer`background: #fff; border-top: 1px solid #e5edf1; color: #708896; padding: 42px max(32px, calc((100% - 1280px) / 2)) 22px; a { text-decoration: none; color: inherit; } @media(max-width: 700px) { padding: 32px 20px 20px; }`;
const FooterInner = styled.div`display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.2fr; gap: 28px; padding-bottom: 36px; h3 { font-size: 11px; font-weight: 650; color: #284f63; margin-bottom: 18px; } p { font-size: 11px; line-height: 1.9; margin-top: 13px; } > div > a:not(:first-child) { display: flex; align-items: center; gap: 7px; font-size: 11px; margin-bottom: 12px; } @media(max-width: 700px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 20px; }`;
const Brand = styled(Link)`display: inline-block; font-weight: 750; font-size: 24px; letter-spacing: -.8px; color: #008ecc !important; span { color: #ff922b; }`;
const FooterBottom = styled.div`padding-top: 20px; border-top: 1px solid #eef2f5; display: flex; justify-content: space-between; gap: 14px; font-size: 9px; color: #91a2ad; span:last-child { display: flex; align-items: center; gap: 5px; } @media(max-width: 550px) { flex-direction: column; }`;
