import styled from "styled-components";
import { Header } from "../Components/Layout/Header/Header";
import { Footer } from "@components/Features/Fooster/Footer";

export function DefaultTemplate({children}: {children: React.ReactNode}) {
    return <Layout><Header /><Content id="main-content">{children}</Content><Footer /></Layout>;
}
const Layout = styled.div`
    min-height: 100vh; display: flex; flex-direction: column; background: #f7f9fb;
`;
const Content = styled.main`
    width: min(1280px, calc(100% - 64px)); margin: 28px auto 64px; flex: 1; display: flex; flex-direction: column; gap: 36px; min-width: 0;
    @media (max-width: 700px) { width: calc(100% - 32px); margin: 20px auto 40px; gap: 28px; }
`;
