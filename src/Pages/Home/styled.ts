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
    h1 em { color: #008ecc; font-style: normal; }
    > p { font-size: 13px; line-height: 1.8; color: #638292; max-width: 350px; margin: 20px 0 26px; }
    > div { display: flex; align-items: center; flex-wrap: wrap; gap: 18px; }
    > div > span { display: flex; gap: 6px; align-items: center; font-size: 10px; color: #638292; }
    @media(max-width: 700px) { h1 { font-size: 38px; letter-spacing: -1.5px; } > small { margin-bottom: 16px; } }
`;
export const PrimaryAction = styled.a`display: inline-flex; align-items: center; gap: 14px; padding: 14px 19px; border-radius: 6px; background: #008ecc; color: white; text-decoration: none; font-size: 12px; font-weight: 600; transition: background .2s; &:hover { background: #0076ad; } &:focus-visible { outline: 3px solid #083e56; outline-offset: 3px; }`;
export const HeroDisplay = styled.div`
    position: relative; z-index: 1; min-width: 0; height: 300px; display: flex; align-items: center; justify-content: center; gap: 18px;
    > a { position: relative; text-decoration: none; width: 190px; padding: 16px; border: 1px solid #fff; border-radius: 8px; background: #ffffffd9; box-shadow: 0 16px 30px #1f709211; transform: rotate(-7deg) translateY(-14px); }
    > a:nth-child(2) { transform: rotate(7deg) translateY(26px); }
    > a > div { height: 155px; display: grid; place-items: center; }
    img { width: 100%; height: 100%; max-height: 155px; object-fit: contain; mix-blend-mode: multiply; }
    strong { display: block; color: #214a60; font-size: 11px; line-height: 1.5; margin-top: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    > a > span { font-size: 11px; color: #1688b7; display: block; margin-top: 4px; font-weight: 600; }
    @media(max-width: 1000px) { > a { width: 160px; padding: 12px; } > a > div { height: 125px; } }
    @media(max-width: 700px) { height: 240px; gap: 10px; > a { width: 132px; min-width: 0; transform: rotate(-5deg) translateY(-5px); } > a:nth-child(2) { transform: rotate(5deg) translateY(10px); } > a > div { height: 115px; } }
`;
export const HeroPlaceholder = styled.div`display: grid; justify-items: center; gap: 20px; color: #1e8cbb; > svg { width: 100px; height: 100px; stroke-width: .9px; } span { font-size: 13px; color: #5e8ca3; }`;
export const DiscoveryTag = styled.div`position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); padding: 9px 14px; background: #fff; border-radius: 8px; box-shadow: 0 6px 22px #2958700c; display: flex; align-items: center; gap: 7px; color: #4e778b; font-size: 10px; white-space: nowrap; svg { color: #ff922b; }`;
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
    > a { font-size: 12px; color: #008ecc; text-decoration: none; display: flex; align-items: center; gap: 8px; white-space: nowrap; padding-bottom: 3px; }
    @media(max-width: 550px) { h2 { font-size: 21px; } > a { font-size: 10px; } }
`;
export const LoadMore = styled.div`display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 28px; button { border: 1px solid #b9dce9; border-radius: 6px; padding: 12px 26px; background: white; color: #1681ad; font-weight: 600; font-size: 12px; cursor: pointer; } button:disabled { opacity: .6; cursor: wait; } span { color: #8b9ba6; font-size: 11px; }`;
export const ErrorState = styled.div`padding: 38px 22px; border: 1px solid #e4eaf0; border-radius: 8px; background: white; text-align: center; h3 { font-size: 17px; color: #2c5266; margin-bottom: 10px; } p { font-size: 12px; color: #899da9; margin-bottom: 20px; line-height: 1.6; } button { padding: 11px 18px; border-radius: 6px; border: 0; background: #008ecc; color: #fff; cursor: pointer; }`;
export const LocalBanner = styled.section`
    display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 34px 40px; border-radius: 8px; background: #0a405a; position: relative; overflow: hidden;
    small { color: #74c8e5; font-size: 9px; letter-spacing: 1.5px; font-weight: 600; }
    h2 { font-size: 26px; letter-spacing: -.7px; color: #fff; margin: 10px 0; }
    p { color: #a7c6d4; font-size: 12px; line-height: 1.7; }
    > svg { width: 75px; height: 75px; color: #72bad3; stroke-width: 1px; flex-shrink: 0; }
    @media(max-width: 700px) { padding: 28px 24px; h2 { font-size: 22px; } > svg { display: none; } }
`;
export const TextLink = styled(Link)`display: inline-flex; align-items: center; gap: 10px; color: #d7f3ff; font-size: 12px; margin-top: 18px; text-decoration: none;`;
