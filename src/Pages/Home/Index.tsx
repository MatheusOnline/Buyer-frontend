import { Link } from "react-router-dom";
import { FiArrowRight, FiCompass, FiHeart, FiHome, FiMapPin, FiPackage, FiShoppingBag, FiTag } from "react-icons/fi";
import { DefaultTemplate } from "../../Template/DefaultTemplate";
import { CatalogProducts } from "@components/Layout/CatalogProducts";
import { CategoryBar } from "../../Components/Layout/CategoryBar/CategoryBar";
import { useHomeProducts } from "../../service/productsService";
import { Hero, HeroCopy, HeroDisplay, CityGrid, MapArtwork, StoreMarker, LocalDiscoveryCard, LocalDiscoveryIcon, LocalDiscoveryCopy, LocalBadge, PrimaryAction, DiscoveryTag, Benefits, CatalogHeader, LoadMore, ErrorState, LocalBanner, TextLink } from "./styled";
export const Home = () => {
    const {data, isPending, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage, isFetchNextPageError} = useHomeProducts();
    const products = Array.from(new Map((data?.pages.flatMap(page => page.data.products) ?? []).map(product => [product.id, product])).values());
    const total = data?.pages[0]?.data.pagination.totalItems ?? 0;
    return <DefaultTemplate>
        <Hero aria-labelledby="home-title">
            <HeroCopy><small><FiMapPin /> PRODUTOS DA SUA CIDADE, EM UM SÓ LUGAR.</small>
                <h1>O que você procura<br />está <em>por perto.</em></h1>
                <p>Encontre produtos nas lojas da sua cidade, compare preços e compre sem sair de casa.</p>
                <div><PrimaryAction href="#home-products">Explorar produtos <FiArrowRight /></PrimaryAction><span><FiHeart /> Escolha comprar local</span></div>
            </HeroCopy>
            <HeroDisplay aria-label="Ilustração do comércio local">
                <CityGrid aria-hidden="true" />
                <MapArtwork aria-hidden="true" viewBox="0 0 560 320" preserveAspectRatio="xMidYMid meet">
                    <path className="street street-main" d="M-12 218 C92 216 115 145 212 151 S326 242 424 202 510 124 572 124" />
                    <path className="street street-secondary" d="M92 -12 C101 72 159 96 155 162 S111 249 130 333" />
                    <path className="street street-secondary" d="M340 -12 C331 62 382 92 369 148 S316 240 340 333" />
                    <path className="route" d="M49 220 C112 210 128 152 208 157 S322 237 404 202 473 139 520 130" />
                </MapArtwork>
                <StoreMarker className="marker-one"><FiHome /></StoreMarker>
                <StoreMarker className="marker-two"><FiShoppingBag /></StoreMarker>
                <StoreMarker className="marker-three"><FiHome /></StoreMarker>
                <LocalDiscoveryCard>
                    <LocalDiscoveryIcon><FiMapPin /></LocalDiscoveryIcon>
                    <LocalDiscoveryCopy><span>COMPRAS LOCAL</span><strong>Comércio perto de você</strong><small>Lojas da sua cidade em um só lugar</small></LocalDiscoveryCopy>
                </LocalDiscoveryCard>
                <LocalBadge><FiShoppingBag /> Descubra. Compare. Compre local.</LocalBadge>
                <DiscoveryTag><FiCompass /> Sua próxima compra começa aqui</DiscoveryTag>
            </HeroDisplay>
        </Hero>
        <Benefits aria-label="Descubra o Compras Local">
            <div><FiMapPin /><div><strong>Conheça o comércio local</strong><span>Compre produtos das lojas da sua cidade.</span></div></div>
            <div><FiTag /><div><strong>Fique de olho nas ofertas</strong><span>Veja os preços promocionais nos produtos.</span></div></div>
            <div><FiPackage /><div><strong>Encontre o que combina com você</strong><span>Diferentes categorias em um só lugar.</span></div></div>
        </Benefits>
        <CategoryBar />
        <section id="home-products" aria-labelledby="products-title" style={{scrollMarginTop: 24}}>
            <CatalogHeader><div><small>DO COMÉRCIO LOCAL PARA VOCÊ</small><h2 id="products-title">Produtos para sua próxima compra</h2><p>Confira os produtos, escolha suas opções e adicione ao carrinho.</p></div><Link to="/search">Ver catálogo <FiArrowRight /></Link></CatalogHeader>
            {isError && !products.length ? <ErrorState role="alert"><h3>Os produtos não carregaram desta vez</h3><p>Não conseguimos conectar com as lojas. Tente novamente em instantes.</p><button type="button" onClick={() => {void refetch();}}>Tentar novamente</button></ErrorState> : <CatalogProducts isLoading={isPending} products={products} />}
            {products.length > 0 && <LoadMore>
                {isFetchNextPageError && <p role="alert">Não foi possível carregar mais produtos. Tente novamente.</p>}
                {hasNextPage && <button type="button" disabled={isFetchingNextPage} onClick={() => {void fetchNextPage();}}>{isFetchingNextPage ? "Carregando…" : "Ver mais produtos"}</button>}
                <span>{products.length} de {total} produtos</span>
            </LoadMore>}
        </section>
        <LocalBanner><div><small>MAIS PERTO DO QUE VOCÊ IMAGINA</small><h2>Quando você compra local,<br />a sua cidade também ganha.</h2><p>Escolha seus produtos e compre nas lojas que fazem parte do seu dia a dia.</p><TextLink to="/search">Ver produtos <FiArrowRight /></TextLink></div><FiShoppingBag /></LocalBanner>
    </DefaultTemplate>;
};
