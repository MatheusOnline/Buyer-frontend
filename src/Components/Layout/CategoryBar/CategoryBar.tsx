import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiMonitor, FiShoppingBag, FiHome, FiActivity, FiSmartphone, FiHeart, FiArrowRight } from "react-icons/fi";
import { homeCategories } from "../../../data/categories";
const icons = {electronics: FiMonitor, fashion: FiShoppingBag, home: FiHome, sports: FiActivity, phone: FiSmartphone, pets: FiHeart};
export function CategoryBar() {
    return <section aria-labelledby="categories-title">
        <TitleRow><div><small>UM MUNDO DE POSSIBILIDADES</small><h2 id="categories-title">O que combina com você?</h2></div><Link to="/search">Ver tudo <FiArrowRight /></Link></TitleRow>
        <Categories>{homeCategories.map(category => {const Icon = icons[category.icon]; return <CategoryLink key={category.id} to={`/search?department=${category.department}`}><Icon /><strong>{category.name}</strong><span>{category.hint}</span></CategoryLink>;})}</Categories>
    </section>;
}
const TitleRow = styled.div`display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 20px; small { font-size: 9px; font-weight: 600; letter-spacing: 1.4px; color: #8399a7; } h2 { margin-top: 8px; font-size: 23px; letter-spacing: -.6px; font-weight: 650; color: #163f55; } > a { display: inline-flex; align-items: center; gap: 8px; color: #008ecc; text-decoration: none; font-size: 12px; white-space: nowrap; } @media(max-width: 550px) { h2 { font-size: 20px; } > a { font-size: 11px; } }`;
const Categories = styled.div`display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; @media(max-width: 1000px) { grid-template-columns: repeat(3, minmax(0, 1fr)); } @media(max-width: 550px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }`;
const CategoryLink = styled(Link)`text-decoration: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; text-align: center; padding: 24px 10px; background: #fff; border: 1px solid #e6edf1; border-radius: 6px; transition: .2s; > svg { width: 40px; height: 40px; padding: 10px; border-radius: 6px; box-sizing: content-box; background: #eef8fd; color: #1388b9; } strong { font-size: 12px; color: #304b5c; font-weight: 600; } span { font-size: 9px; line-height: 1.4; color: #8b9ba6; } &:hover { border-color: #95d5ef; transform: translateY(-2px); background: #fcfeff; } &:focus-visible { outline: 2px solid #008ecc; outline-offset: 3px; }`;
