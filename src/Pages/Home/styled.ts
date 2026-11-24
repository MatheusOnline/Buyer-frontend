import styled from "styled-components";
import { Link } from "react-router-dom";

export const Hero = styled.section`
    min-height: 390px; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center; gap: 30px; padding: 46px 54px; position: relative; overflow: hidden; border-radius: 8px; background: #eaf6fc;
    &::before { content: ""; position: absolute; width: 480px; height: 480px; border-radius: 6px; background: #d5eefb; right: -50px; top: -60px; }
    @media(max-width: 1050px) { padding: 36px; }
    @media(max-width: 700px) { grid-template-columns: minmax(0, 1fr); gap: 24px; padding: 32px 24px; min-height: auto; }
`;
export const HeroCopy = styled.div`
    position: relative; z-index: 1; min-width: 0; max-width: 460px;
    > small { display: inline-flex; align-items: center; gap: 8px; font-size: 9px; letter-spacing: 1.5px; font-weight: 600; color: #3888a9; margin-bottom: 20px; }
    h1 { font-size: clamp(32px, 3.8vw, 52px); line-height: 1.12; letter-spacing: -2px; color: #103f57; font-weight: 700; }
    h1 em { color: var(--action-primary); font-style: normal; }
    > p { font-size: 13px; line-height: 1.8; color: #638292; max-width: 350px; margin: 20px 0 26px; }
    > div { display: flex; align-items: center; flex-wrap: wrap; gap: 18px; }
    > div > span { display: flex; gap: 6px; align-items: center; font-size: 10px; color: #638292; }
    @media(max-width: 700px) { h1 { font-size: 38px; letter-spacing: -1.5px; } > small { margin-bottom: 16px; } }
`;
export const PrimaryAction = styled.a`display: inline-flex; align-items: center; gap: 14px; padding: 14px 19px; border-radius: 6px; background: var(--action-primary); color: white; text-decoration: none; font-size: 12px; font-weight: 600; transition: background .2s; &:hover { background: var(--action-primary-hover); } &:focus-visible { outline: 3px solid #083e56; outline-offset: 3px; }`;
export const HeroDisplay = styled.div`
    position: relative; z-index: 1; min-width: 0; height: 300px; display: grid; place-items: center;
    @media(max-width: 700px) { height: 230px; }
`;
export const CityGrid = styled.div`
    position:absolute;inset:4px 0;border:1px solid #ffffff80;border-radius:50%;
    background:
        linear-gradient(28deg,transparent 47%,#ffffff60 47.3%,#ffffff60 48.2%,transparent 48.5%),
        linear-gradient(148deg,transparent 36%,#ffffff70 36.3%,#ffffff70 37.2%,transparent 37.5%),
        repeating-linear-gradient(0deg,transparent 0 35px,#ffffff55 36px 38px,transparent 39px 70px),
        repeating-linear-gradient(90deg,transparent 0 48px,#ffffff55 49px 51px,transparent 52px 96px);
    opacity:.78;transform:rotate(-9deg) scale(1.06);
    @media(max-width:700px){inset:10px 0;}
`;
export const MapArtwork = styled.svg`
    position:absolute;width:100%;height:100%;overflow:visible;
    .street{fill:none;stroke:#d1e9f2;stroke-linecap:round;}
    .street-main{stroke-width:25px;}
    .street-secondary{stroke-width:18px;}
    .route{fill:none;stroke:#63c5e4;stroke-width:3px;stroke-linecap:round;stroke-dasharray:2 9;}
`;
export const StoreMarker = styled.span`
    position:absolute;width:40px;height:40px;display:grid;place-items:center;border:4px solid #fff;border-radius:50%;
    background:#078fc4;color:#fff;box-shadow:0 8px 20px #13566a24;
    svg{width:17px;height:17px;stroke-width:2.2;}
    &.marker-one{left:14%;top:60%;background:#ff963e;}
    &.marker-two{left:37%;top:26%;width:48px;height:48px;background:#078fc4;}
    &.marker-three{right:12%;top:36%;background:#30a58d;}
    @media(max-width:700px){width:34px;height:34px;&.marker-two{width:42px;height:42px;}}
`;
export const LocalDiscoveryCard = styled.div`
    position:relative;z-index:1;display:flex;align-items:center;gap:14px;width:min(310px,78%);padding:18px;
    border:1px solid #ffffffd9;border-radius:8px;background:#ffffffeb;box-shadow:0 18px 45px #1f70921a;
    transform:translateY(4px);animation:float-card 5s ease-in-out infinite;
    @keyframes float-card{0%,100%{transform:translateY(4px)}50%{transform:translateY(-4px)}}
    @media(max-width:700px){width:min(280px,82%);padding:14px;gap:10px;}
`;
export const LocalDiscoveryIcon = styled.span`
    flex:0 0 48px;width:48px;height:48px;display:grid;place-items:center;border-radius:8px;background:#e6f6fc;color:#078fc4;
    svg{width:24px;height:24px;stroke-width:1.8;}
    @media(max-width:700px){flex-basis:40px;width:40px;height:40px;svg{width:21px;height:21px;}}
`;
export const LocalDiscoveryCopy = styled.div`
    min-width:0;display:grid;gap:5px;
    span{font-size:8px;letter-spacing:1.4px;color:#50869b;font-weight:700;}
    strong{font-size:15px;line-height:1.2;color:#17465c;}
    small{font-size:10px;color:#7993a0;}
    @media(max-width:700px){strong{font-size:13px;}small{font-size:9px;}}
`;
export const LocalBadge = styled.div`
    position:absolute;left:5%;bottom:10%;z-index:2;display:flex;align-items:center;gap:8px;padding:9px 12px;
    background:#fff;border-radius:6px;box-shadow:0 7px 20px #29587012;color:#4e778b;font-size:9px;white-space:nowrap;
    svg{color:#ff922b;}
    @media(max-width:700px){left:0;bottom:4%;font-size:8px;padding:8px 10px;}
`;
export const DiscoveryTag = styled.div`position: absolute; right: 2%; top: 9%; padding: 9px 14px; background: #fff; border-radius: 6px; box-shadow: 0 6px 22px #2958700c; display: flex; align-items: center; gap: 7px; color: #4e778b; font-size: 10px; white-space: nowrap; svg { color: #ff922b; } @media(max-width:700px){right:0;top:3%;font-size:8px;padding:8px 10px;}`;
export const Benefits = styled.div`
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; padding: 23px 28px; background: white; border: 1px solid #e6edf1; border-radius: 6px; margin-top: -16px;
    > div { display: flex; align-items: center; justify-content: center; gap: 14px; }
    > div + div { border-left: 1px solid #e8eef2; }
    svg { color: #0b90bd; width: 23px; height: 23px; flex-shrink: 0; }
    strong { display: block; font-size: 11px; color: #365769; font-weight: 600; margin-bottom: 5px; }
    span { display: block; font-size: 10px; color: #8a9da8; }
    @media(max-width: 700px) { padding: 20px 16px; gap: 16px; grid-template-columns: 1fr; > div { justify-content: flex-start; } > div + div { border-left: 0; padding-top: 16px; border-top: 1px solid #eef2f4; } }
`;
export const CatalogHeader = styled.div`
    display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-bottom: 22px;
    small { font-size: 9px; letter-spacing: 1.4px; color: #8b9ba6; font-weight: 600; }
    h2 { margin: 8px 0; font-size: 25px; letter-spacing: -.7px; color: #163f55; font-weight: 650; }
    p { font-size: 12px; color: #8b9ba6; }
    > a { font-size: 12px; color: var(--action-primary); text-decoration: none; display: flex; align-items: center; gap: 8px; white-space: nowrap; padding-bottom: 3px; }
    @media(max-width: 550px) { h2 { font-size: 21px; } > a { font-size: 10px; } }
`;
export const LoadMore = styled.div`display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 28px; button { border: 1px solid #b9dce9; border-radius: 6px; padding: 12px 26px; background: white; color: #1681ad; font-weight: 600; font-size: 12px; cursor: pointer; } button:disabled { opacity: .6; cursor: wait; } span { color: #8b9ba6; font-size: 11px; }`;
export const ErrorState = styled.div`padding: 38px 22px; border: 1px solid #e4eaf0; border-radius: 8px; background: white; text-align: center; h3 { font-size: 17px; color: #2c5266; margin-bottom: 10px; } p { font-size: 12px; color: #899da9; margin-bottom: 20px; line-height: 1.6; } button { padding: 11px 18px; border-radius: 6px; border: 0; background: var(--action-primary); color: #fff; cursor: pointer; }`;
export const LocalBanner = styled.section`
    display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 34px 40px; border-radius: 8px; background: #0a405a; position: relative; overflow: hidden;
    small { color: #74c8e5; font-size: 9px; letter-spacing: 1.5px; font-weight: 600; }
    h2 { font-size: 26px; letter-spacing: -.7px; color: #fff; margin: 10px 0; }
    p { color: #a7c6d4; font-size: 12px; line-height: 1.7; }
    > svg { width: 75px; height: 75px; color: #72bad3; stroke-width: 1px; flex-shrink: 0; }
    @media(max-width: 700px) { padding: 28px 24px; h2 { font-size: 22px; } > svg { display: none; } }
`;
export const TextLink = styled(Link)`display: inline-flex; align-items: center; gap: 10px; color: #d7f3ff; font-size: 12px; margin-top: 18px; text-decoration: none;`;
