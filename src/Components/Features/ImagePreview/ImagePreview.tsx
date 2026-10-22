import { useState } from "react";
import styled from "styled-components";
import { FiImage } from "react-icons/fi";

type Props = {images?: string[]; isLoading: boolean; title?: string; featuredImage?: string | null};
export const ImagePreview = ({images = [], isLoading, title = "Produto", featuredImage}: Props) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [failed, setFailed] = useState<string[]>([]);
    const validImages = [...new Set([...(featuredImage ? [featuredImage] : []), ...images])].filter(image => image && !failed.includes(image));
    const active = selected && validImages.includes(selected) ? selected : validImages[0];
    return <Gallery aria-label="Fotos do produto" aria-busy={isLoading}>
        <ImageRow><Main>{isLoading ? <Placeholder /> : active ? <img src={active} alt={title} onError={() => setFailed(previous => [...previous, active])} /> : <Empty><FiImage size={48} /><span>Imagem indisponível</span></Empty>}</Main>
        {validImages.length > 1 && <Thumbnails>{validImages.map((image, index) => <Thumb key={image} type="button" $active={image === active} aria-label={`Ver foto ${index + 1} de ${title}`} aria-pressed={image === active} onClick={() => setSelected(image)}><img src={image} alt={`Foto ${index + 1}`} /></Thumb>)}</Thumbnails>}</ImageRow>
        {!isLoading && validImages.length > 1 && <Caption>{validImages.indexOf(active) + 1} / {validImages.length} fotos · Selecione uma miniatura para explorar</Caption>}
    </Gallery>;
};
const Gallery = styled.section`min-width:0;`;
const ImageRow = styled.div`display:flex;gap:14px;align-items:stretch;@media(max-width:700px){gap:8px;}`;
const Main = styled.div`flex:1;min-width:0;order:2;height:470px; padding:36px; display:flex; align-items:center; justify-content:center; background:white; border:1px solid #e9eef2; border-radius:8px; img{width:100%;height:100%;object-fit:contain;} @media(max-width:700px){height:330px;padding:16px;}`;
const Thumbnails = styled.div`order:1;display:flex;flex-direction:column;gap:12px;overflow-y:auto;max-height:470px;flex:0 0 76px;padding:2px;@media(max-width:700px){flex-basis:52px;gap:8px;max-height:330px;}`;
const Thumb = styled.button<{$active:boolean}>`flex:0 0 72px;width:72px;height:72px;@media(max-width:700px){width:48px;height:48px;flex-basis:48px;}padding:6px;border-radius:6px;background:white;border:2px solid ${({$active})=>$active?'#36c5fa':'#e9eef2'};cursor:pointer;img{width:100%;height:100%;object-fit:contain;} &:focus-visible{outline:3px solid #15799f;outline-offset:2px;}`;
const Caption = styled.p`font-size:12px;color:#788994;margin-top:12px;`;
const Empty = styled.div`display:grid;justify-items:center;gap:12px;color:#91a0ab;font-size:14px;`;
const Placeholder = styled.div`width:80%;height:80%;border-radius:8px;background:#f3f6f8;`;
