import { useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { DefaultTemplate } from "../../Template/DefaultTemplate";
import { ScrollToTop } from "@components/UI/ScrollToTop";
import { ProductInfo } from "@components/Layout/ProductInformation";
import { ImagePreview } from "../../Components/Features/ImagePreview";
import { useGet } from "../../service/productsService";
import type { ProductInformationProps } from "../../types/types";

const ProductPage = () => {
    const {id} = useParams();
    const [selection, setSelection] = useState<{productId:string; skuId:string} | null>(null);
    const query = useGet(id ?? "");
    const product = query.data?.data as ProductInformationProps | undefined;
    const selectedSku = selection?.productId === id ? product?.skus?.find(sku => sku.id === selection?.skuId) : undefined;
    return <DefaultTemplate><ScrollToTop />
        <Navigation aria-label="Navegação do produto"><Link to="/">Início</Link><FiChevronRight /><Link to="/search">Produtos</Link><FiChevronRight /><span>{product?.title ?? "Detalhes do produto"}</span></Navigation>
        {query.isError || (!query.isLoading && !product) ? <Empty><h1>Não foi possível carregar este produto</h1><p>Ele pode estar indisponível. Explore outros produtos ou tente novamente.</p><button type="button" onClick={() => query.refetch()}>Tentar novamente</button><Link to="/search">Voltar ao catálogo</Link></Empty> : <>
            <ProductLayout><ImagePreview key={`${id}-${selectedSku?.id ?? "default"}`} featuredImage={selectedSku?.image_url} isLoading={query.isLoading} title={product?.title} images={product?.images?.length ? product.images : product?.image ? [product.image] : []} /><ProductInfo key={id} isLoading={query.isLoading} product={product!} selectedSku={selectedSku} onSelectSku={skuId => setSelection({productId:id!,skuId})} /></ProductLayout>
            {product && <Details><div><Eyebrow>CONHEÇA CADA DETALHE</Eyebrow><h2>Sobre o produto</h2></div><Description>{product.description?.trim() || "O vendedor ainda não adicionou uma descrição para este produto."}</Description><Specs><div><dt>Código do produto</dt><dd>{product.code}</dd></div>{product.brand && <div><dt>Marca</dt><dd>{product.brand}</dd></div>}<div><dt>Loja</dt><dd>{product.store || "Loja local"}</dd></div></Specs></Details>}
            <Back to="/search"><FiArrowLeft />Continuar explorando produtos</Back>
        </>}
    </DefaultTemplate>;
};
export default ProductPage;
const Navigation = styled.nav`display:flex;gap:9px;align-items:center;color:#85949f;font-size:12px;min-width:0;a{color:#577383;text-decoration:none;white-space:nowrap;}span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}svg{flex-shrink:0;}`;
const ProductLayout = styled.div`display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:36px;align-items:start;@media(max-width:850px){grid-template-columns:minmax(0,1fr);gap:24px;}`;
const Details = styled.section`padding:32px;background:white;border:1px solid #e9eef2;border-radius:8px;h2{color:#243f4e;font-size:23px;margin:8px 0 24px;}@media(max-width:700px){padding:24px;}`;
const Eyebrow = styled.p`color:#79909c;font-size:10px;letter-spacing:1.4px;font-weight:600;margin:0;`;
const Description = styled.p`white-space:pre-wrap;overflow-wrap:anywhere;font-size:14px;line-height:1.9;color:#627682;max-width:850px;`;
const Specs = styled.dl`margin:28px 0 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;border-top:1px solid #edf1f4;padding-top:24px;dt{font-size:12px;color:#83949e;margin-bottom:6px;}dd{margin:0;font-size:14px;color:#344f5f;overflow-wrap:anywhere;}@media(max-width:500px){grid-template-columns:1fr;}`;
const Back = styled(Link)`display:flex;gap:8px;align-items:center;color:#3183a2;text-decoration:none;font-size:13px;`;
const Empty = styled.section`text-align:center;padding:60px 24px;color:#456071;h1{font-size:24px;}p{line-height:1.7;}button,a{display:inline-block;margin:12px;padding:12px 18px;border-radius:6px;border:1px solid #bcdce9;color:#22799b;background:white;cursor:pointer;}`;
