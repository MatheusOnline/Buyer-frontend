import styled from "styled-components";
import type { CardProductProps } from "../../../types/types";
import { CatalogProductsSkeleton } from "./CatalogProductsSkeleton";
import { ProductCard } from "../../Features/ProductCard/ProductCard";

type CatalogProductsProps = {products?: CardProductProps[]; isLoading: boolean};
export function CatalogProducts({products = [], isLoading}: CatalogProductsProps) {
    if (isLoading) return <ProductGrid aria-label="Carregando produtos" aria-busy="true"><CatalogProductsSkeleton /></ProductGrid>;
    if (!products.length) return <Empty>Nenhum produto encontrado por aqui.<span>Experimente outra categoria ou uma nova busca.</span></Empty>;
    return <ProductGrid>{products.map(product => <ProductCard key={product.id} {...product} />)}</ProductGrid>;
}
const ProductGrid = styled.div`
    display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px;
    @media(max-width: 1200px) { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
    @media(max-width: 950px) { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
    @media(max-width: 700px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    @media(max-width: 350px) { grid-template-columns: 1fr; }
`;
const Empty = styled.div`padding: 56px 24px; text-align: center; background: white; border: 1px dashed #d6e3eb; border-radius: 8px; color: #36596d; font-size: 15px; span { display: block; font-size: 12px; color: #8799a5; margin-top: 10px; }`;
