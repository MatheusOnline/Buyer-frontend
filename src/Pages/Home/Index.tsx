import { Link } from "react-router-dom";
import { FiArrowRight, FiCompass, FiHeart, FiMapPin, FiPackage, FiShoppingBag, FiTag } from "react-icons/fi";
import { DefaultTemplate } from "../../Template/DefaultTemplate";
import { CatalogProducts } from "@components/Layout/CatalogProducts";
import { CategoryBar } from "../../Components/Layout/CategoryBar/CategoryBar";
import { useHomeProducts } from "../../service/productsService";
import { Hero, HeroCopy, HeroDisplay, HeroPlaceholder, PrimaryAction, DiscoveryTag, Benefits, CatalogHeader, LoadMore, ErrorState, LocalBanner, TextLink } from "./styled";

const currency = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"});
export const Home = () => {
    const {data, isPending, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage, isFetchNextPageError} = useHomeProducts();
    const products = Array.from(new Map((data?.pages.flatMap(page => page.data.products) ?? []).map(product => [product.id, product])).values());
    const total = data?.pages[0]?.data.pagination.totalItems ?? 0;
    const featured = products.filter(product => product.image).slice(0, 2);
    return <DefaultTemplate>
        <Hero aria-labelledby="home-title">
            <HeroCopy><small><FiMapPin /> COMPRE LOCAL. DESCUBRA MAIS.</small>
                <h1>Seu próximo favorito<br />está <em>por perto.</em></h1>
                <p>Explore produtos, descubra novas lojas e valorize quem faz parte da sua cidade.</p>
                <div><PrimaryAction href="#home-products">Explorar produtos <FiArrowRight /></PrimaryAction><span><FiHeart /> Escolha comprar local</span></div>
            </HeroCopy>
            <HeroDisplay>
                {featured.length ? featured.map(product => <Link key={product.id} to={`/product/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, "-"))}/${product.id}`} aria-label={`Conheça ${product.title}`}>
                    <div><img src={product.image} alt={product.title} /></div><strong>{product.title}</strong><span>{currency.format(product.current_price ?? product.original_price)}</span>
                </Link>) : <HeroPlaceholder><FiShoppingBag /><span>Uma cidade de possibilidades.</span></HeroPlaceholder>}
                <DiscoveryTag><FiCompass /> Grandes descobertas começam por perto</DiscoveryTag>
            </HeroDisplay>
        </Hero>
        <Benefits aria-label="Descubra o Compras Local">
            <div><FiMapPin /><div><strong>Conheça o comércio local</strong><span>Descubra lojas e novos favoritos.</span></div></div>
            <div><FiTag /><div><strong>Fique de olho nas ofertas</strong><span>Veja os preços promocionais nos produtos.</span></div></div>
            <div><FiPackage /><div><strong>Encontre o que combina com você</strong><span>Diferentes categorias em um só lugar.</span></div></div>
        </Benefits>
        <CategoryBar />
        <section id="home-products" aria-labelledby="products-title" style={{scrollMarginTop: 24}}>
            <CatalogHeader><div><small>DO COMÉRCIO LOCAL PARA VOCÊ</small><h2 id="products-title">Encontre seu próximo favorito</h2><p>Novidades para descobrir, escolher e levar para casa.</p></div><Link to="/search">Ver catálogo <FiArrowRight /></Link></CatalogHeader>
            {isError && !products.length ? <ErrorState role="alert"><h3>Os produtos não carregaram desta vez</h3><p>Não conseguimos conectar com as lojas. Tente novamente em instantes.</p><button type="button" onClick={() => {void refetch();}}>Tentar novamente</button></ErrorState> : <CatalogProducts isLoading={isPending} products={products} />}
            {products.length > 0 && <LoadMore>
                {isFetchNextPageError && <p role="alert">Não foi possível carregar mais produtos. Tente novamente.</p>}
                {hasNextPage && <button type="button" disabled={isFetchingNextPage} onClick={() => {void fetchNextPage();}}>{isFetchingNextPage ? "Carregando…" : "Descobrir mais produtos"}</button>}
                <span>{products.length} de {total} produtos</span>
            </LoadMore>}
        </section>
        <LocalBanner><div><small>MAIS PERTO DO QUE VOCÊ IMAGINA</small><h2>Quando você compra local,<br />a sua cidade também ganha.</h2><p>Encontre novas possibilidades nas lojas que fazem parte do seu dia a dia.</p><TextLink to="/search">Descubra o catálogo <FiArrowRight /></TextLink></div><FiShoppingBag /></LocalBanner>
    </DefaultTemplate>;
};
