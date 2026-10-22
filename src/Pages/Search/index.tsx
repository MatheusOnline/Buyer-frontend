import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DefaultTemplate } from "../../Template/DefaultTemplate";
import { CatalogProducts } from "@components/Layout/CatalogProducts";
import { useList } from "../../service/productsService";
import { homeCategories } from "../../data/categories";
import { CatalogHeader, ErrorState, LoadMore } from "../Home/styled";

const Search = () => {
    const [params] = useSearchParams();
    const q = params.get("q") ?? "";
    const category = params.get("category") ?? "";
    const department = params.get("department") ?? "";
    const [pagination, setPagination] = useState({query: q, category, department, page: 1});
    const page = pagination.query === q && pagination.category === category && pagination.department === department ? pagination.page : 1;
    const {data, isPending, isError, refetch} = useList({search: q || undefined, category: category || undefined, department: department || undefined, page, limit: 12});
    const details = data?.data.pagination;
    const categoryName = homeCategories.find(item => item.id === category || item.department === department)?.name;
    function changePage(value: number) { setPagination({query: q, category, department, page: value}); window.scrollTo({top: 0, behavior: "smooth"}); }
    return <DefaultTemplate>
        <section>
            <CatalogHeader><div><small>EXPLORE O COMÉRCIO LOCAL</small><h2>{q ? `Resultados para “${q}”` : categoryName ?? "Todos os produtos"}</h2><p>{isPending ? "Buscando produtos…" : `${details?.totalItems ?? 0} ${details?.totalItems === 1 ? "produto encontrado" : "produtos encontrados"}`}</p></div><Link to="/">Voltar ao início</Link></CatalogHeader>
            {isError ? <ErrorState role="alert"><h3>Não foi possível carregar os produtos</h3><p>Tente novamente para continuar explorando.</p><button type="button" onClick={() => {void refetch();}}>Tentar novamente</button></ErrorState> : <CatalogProducts products={data?.data.products} isLoading={isPending} />}
            {details && details.totalPages > 1 && <LoadMore><div style={{display: "flex", gap: 12}}><button disabled={page <= 1} onClick={() => changePage(page - 1)}>Anterior</button><button disabled={page >= details.totalPages} onClick={() => changePage(page + 1)}>Próxima</button></div><span>Página {page} de {details.totalPages}</span></LoadMore>}
        </section>
    </DefaultTemplate>;
};
export default Search;
