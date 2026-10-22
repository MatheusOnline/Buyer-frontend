import { Link, Navigate, useSearchParams } from "react-router-dom";
import { FiArrowRight, FiChevronRight, FiHeart, FiRefreshCw } from "react-icons/fi";
import { DefaultTemplate } from "../../../Template/DefaultTemplate";
import { ScrollToTop } from "../../../Components/UI/ScrollToTop";
import { CatalogProducts } from "../../../Components/Layout/CatalogProducts/CatalogProducts";
import { useGetLikes } from "../hooks/useFavorites";
import { favoritesPage, favoritesPageUrl } from "../utils/favoritesPagination";
import { Action, Breadcrumb, Count, Empty, Eyebrow, Heading, Pagination } from "../components/favorites.styles";
export default function FavoritesPage() {
    const [params] = useSearchParams();
    const page = favoritesPage(params.get("page"));
    const query = useGetLikes(page);
    const products = query.data?.data.products ?? [];
    const pagination = query.data?.data.pagination;
    if (pagination && !query.isError && page > Math.max(1,pagination.totalPages)) return <Navigate to={favoritesPageUrl(Math.max(1,pagination.totalPages))} replace />;
    return <DefaultTemplate><ScrollToTop />
        <Breadcrumb aria-label="Navegação de favoritos"><Link to="/">Início</Link><FiChevronRight /><span>Favoritos</span></Breadcrumb>
        <Heading><div><Eyebrow><FiHeart aria-hidden="true" /> SUAS DESCOBERTAS SALVAS</Eyebrow><h1>Meus favoritos</h1><p>Os produtos que você gostou, reunidos em um só lugar.</p></div><Action to="/search">Explorar produtos <FiArrowRight aria-hidden="true" /></Action></Heading>
        {query.isError ? <Empty role="alert"><FiRefreshCw aria-hidden="true" /><h2>Não foi possível carregar seus favoritos</h2><p>Tente novamente em instantes para conferir os produtos que você salvou.</p><button type="button" disabled={query.isFetching} onClick={() => query.refetch()}>{query.isFetching ? "Tentando novamente…" : "Tentar novamente"}</button></Empty> : query.isLoading ? <CatalogProducts isLoading /> : !products.length ? <Empty><FiHeart aria-hidden="true" /><h2>Seus próximos favoritos estão por aí</h2><p>Toque no coração de um produto para salvá-lo aqui e encontrar de novo quando quiser.</p><Action to="/search">Descobrir produtos <FiArrowRight aria-hidden="true" /></Action></Empty> : <>
            <Count aria-live="polite">{pagination?.totalItems ?? products.length} {(pagination?.totalItems ?? products.length) === 1 ? "produto salvo" : "produtos salvos"} · Para remover, toque no coração.</Count>
            <CatalogProducts isLoading={false} products={products.map(product => ({...product,liked:true}))} />
            {pagination && pagination.totalPages > 1 && <Pagination aria-label="Páginas de favoritos">{page > 1 && <Link to={favoritesPageUrl(page - 1)}>Anterior</Link>}<span>Página {page} de {pagination.totalPages}</span>{page < pagination.totalPages && <Link to={favoritesPageUrl(page + 1)}>Próxima</Link>}</Pagination>}
        </>}
    </DefaultTemplate>;
}
