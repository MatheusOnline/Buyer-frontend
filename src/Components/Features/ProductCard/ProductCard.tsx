import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiCheck, FiHeart, FiImage, FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../../stores/useAuthStore";
import { useLikedProduct } from "../../../service/likeService";
import { useAddItemToCart } from "../../../service/cartService";
import type { CardProductProps } from "../../../types/types";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function createSlug(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function ProductCard({
    original_price, store, title, image, id, code, assessment, current_price,
    liked = false, from_price, available_stock, sku_count, promotion,
}: CardProductProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuth(state => state.user);
    const favorite = useLikedProduct();
    const cart = useAddItemToCart();
    const [imageFailed, setImageFailed] = useState(false);
    const name = title || "Produto";
    const original = Number(original_price);
    const current = Number(current_price);
    const onSale = Number.isFinite(current) && current > 0 && current < original;
    const price = onSale ? current : original;
    const url = `/product/${createSlug(name)}/${id}`;
    const hasOptions = (sku_count ?? 0) > 1;
    const soldOut = available_stock === 0;
    const hasRating = Number.isFinite(assessment) && Number(assessment) > 0;

    function handleCart() {
        if (hasOptions) {
            navigate(url);
            return;
        }
        if (!user) {
            navigate("/auth/login", {state:{from:url}});
            return;
        }
        cart.mutate(id);
    }

    return (
        <Card>
            <CardHeader>
                <Favorite
                    type="button"
                    aria-label={liked ? `Remover ${name} dos favoritos` : `Favoritar ${name}`}
                    aria-pressed={liked}
                    disabled={favorite.isPending}
                    $liked={liked}
                    onClick={() => user ? favorite.mutate(id) : navigate("/auth/login", {state:{from:location.pathname + location.search}})}
                >
                    <FiHeart aria-hidden="true" />
                </Favorite>
                <ProductCode title={`Código ${code}`}>#{code}</ProductCode>
            </CardHeader>

            <ImageLink to={url} aria-label={`Ver ${name}`}>
                {image && !imageFailed ? (
                    <img src={image} alt={name} loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
                ) : (
                    <MissingImage><FiImage /><span>Imagem indisponível</span></MissingImage>
                )}
            </ImageLink>

            <CardInfo>
                {hasRating && (
                    <Rating aria-label={`Avaliação: ${assessment} de 5`}>
                        <span aria-hidden="true">{"★".repeat(Math.round(Math.min(5, Number(assessment))))}</span>
                        <small>({Number(assessment).toLocaleString("pt-BR", { maximumFractionDigits: 1 })})</small>
                    </Rating>
                )}
                <ProductName to={url}>{name}</ProductName>
                <Store>{store || "Loja local"}</Store>

                <PurchaseRow>
                    <PriceBlock>
                        {from_price && <small>A partir de</small>}
                        <PriceLine>
                            <strong>{Number.isFinite(price) ? currency.format(price) : "Consulte"}</strong>
                            {onSale && <del title={promotion?.name}>{currency.format(original)}</del>}
                        </PriceLine>
                    </PriceBlock>
                    <CartButton
                        type="button"
                        disabled={soldOut || cart.isPending}
                        aria-label={soldOut ? `${name} sem estoque` : hasOptions ? `Escolher opções de ${name}` : `Adicionar ${name} ao carrinho`}
                        title={soldOut ? "Sem estoque" : hasOptions ? "Escolher opções" : "Adicionar ao carrinho"}
                        aria-busy={cart.isPending}
                        onClick={handleCart}
                    >
                        {cart.isSuccess ? <FiCheck aria-hidden="true" /> : <FiShoppingCart aria-hidden="true" />}
                    </CartButton>
                </PurchaseRow>
                {soldOut && <Availability>Sem estoque no momento</Availability>}
                {cart.isSuccess && <ScreenReaderStatus role="status">Produto adicionado ao carrinho.</ScreenReaderStatus>}
                {(favorite.isError || cart.isError) && (
                    <ErrorText role="alert">{cart.isError ? "Não foi possível adicionar ao carrinho." : "Não foi possível atualizar os favoritos."}</ErrorText>
                )}
            </CardInfo>
        </Card>
    );
}

const Card = styled.article`
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 12px;
    border: 1px solid #edf0f3;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 5px 18px rgba(35, 47, 58, .08);
    transition: box-shadow .2s, transform .2s;

    &:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(35, 47, 58, .13); }
    a:focus-visible, button:focus-visible { outline: 2px solid #008ecc; outline-offset: 3px; border-radius: 4px; }
    @media(max-width: 550px) { padding: 10px; border-radius: 6px; }
`;
const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    min-height: 32px;
`;
const Favorite = styled.button<{ $liked: boolean }>`
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border: 0;
    border-radius: 6px;
    background: #fff;
    color: ${({ $liked }) => $liked ? "#ff4048" : "#454b52"};
    box-shadow: 0 4px 12px rgba(30, 40, 50, .16);
    cursor: pointer;
    svg { width: 20px; height: 20px; stroke-width: 1.5; fill: ${({ $liked }) => $liked ? "#ff4048" : "none"}; }
    &:disabled { opacity: .5; }
`;
const ProductCode = styled.span`
    min-width: 0;
    color: #a4adb8;
    font-size: 9px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const ImageLink = styled(Link)`
    display: flex;
    height: 155px;
    padding: 12px 14px 8px;
    align-items: center;
    justify-content: center;
    img { width: 100%; height: 100%; object-fit: contain; transition: transform .2s; }
    &:hover img { transform: scale(1.04); }
    @media(max-width: 550px) { height: 132px; padding: 10px 6px 8px; }
`;
const MissingImage = styled.div`
    display: grid;
    justify-items: center;
    gap: 8px;
    color: #a1afba;
    svg { width: 30px; height: 30px; }
    span { font-size: 9px; }
`;
const CardInfo = styled.div`display: flex; flex-direction: column; flex: 1; padding: 8px 2px 2px; min-width: 0;`;
const ProductName = styled(Link)`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 38px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.45;
    text-decoration: none;
    color: #323439;
    @media(max-width: 550px) { font-size: 12px; min-height: 35px; }
`;
const Store = styled.p`
    margin-top: 3px;
    color: #89919e;
    font-size: 11px;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @media(max-width: 550px) { font-size: 10px; }
`;
const Rating = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
    span { color: #ff922b; font-size: 12px; letter-spacing: 1px; }
    small { color: #89919e; font-size: 10px; }
`;
const PurchaseRow = styled.div`display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 18px;`;
const PriceBlock = styled.div`min-width: 0; small { display: block; margin-bottom: 3px; font-size: 9px; color: #89919e; }`;
const PriceLine = styled.div`
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 3px 6px;
    strong { color: #323439; font-size: 20px; font-weight: 700; letter-spacing: -.65px; white-space: nowrap; line-height: 1.3; }
    del { color: #adb5bd; font-size: 9px; white-space: nowrap; }
    @media(max-width: 550px) { strong { font-size: 17px; letter-spacing: -.6px; } del { font-size: 8px; } }
`;
const CartButton = styled.button`
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border: 0;
    border-radius: 4px;
    background: #36c5fa;
    color: #fff;
    cursor: pointer;
    transition: background .2s;
    svg { width: 22px; height: 22px; stroke-width: 2; }
    &:hover { background: #0caeeb; }
    &:disabled { background: #c6d5df; cursor: not-allowed; }
    @media(max-width: 550px) { width: 32px; height: 34px; svg { width: 20px; height: 20px; } }
`;
const Availability = styled.p`font-size: 9px; color: #89919e; margin-top: 6px;`;
const ErrorText = styled.p`font-size: 10px; color: #b42318; margin-top: 8px;`;
const ScreenReaderStatus = styled.span`position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0;`;
