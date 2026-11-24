import styled from "styled-components"
import { Button } from "../../../../shared/components/ui/Button/index.tsx"
import  { useState } from "react"

type FilterRootProps = {
    children: React.ReactNode
    title: string
    onApply: () => void
    onClear: () => void
}



export const FilterRoot = ({  children,title, onClear, onApply }: FilterRootProps) => {
    const [active, setActive] = useState(false)
    

    

    return (
        <Container  onMouseLeave={() => setActive(false)}>
            <Button
                palette="primary"
                variant="outlined"
                onclick={() => setActive(!active)}
            >
                {title}
            </Button>

            <ContainerWindow active={active}>
                <Header>
                    <Title>Filtro de {title}</Title>
                </Header>

                <Content >
                    {children}
                </Content>

                <Footer>
                    <ClearButton onClick={onClear}>Clear</ClearButton>
                    <ApplyButton onClick={onApply}>Apply</ApplyButton>
                </Footer>
            </ContainerWindow>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
`

const ContainerWindow = styled.div<{ active: boolean }>`
    background-color: #ffffff;
    width: 260px;
    border-radius: 16px 16px 16px 16px;
    position: absolute;
    top: 50px;
    right: 0;
    z-index: 1000;

    border: 1px solid #e5e5e5;

    box-shadow:
        0px 10px 30px rgba(0, 0, 0, 0.08),
        0px 2px 8px rgba(0, 0, 0, 0.04);

    opacity: ${({ active }) => (active ? 1 : 0)};
    transform: ${({ active }) =>
        active ? "translateY(0px) scale(1)" : "translateY(-10px) scale(0.98)"};

    visibility: ${({ active }) =>
        active ? "visible" : "hidden"};

    transition:
        opacity 0.25s ease,
        transform 0.25s ease,
        visibility 0.25s ease;

    overflow: hidden;
`

const Header = styled.div`
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
`

const Title = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #222;
    margin: 0;
    text-transform: capitalize;
`

const Content = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`


const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;

    padding: 16px;
    border-top: 1px solid #f0f0f0;
`

const ClearButton = styled.button`
    flex: 1;
    height: 40px;

    border: none;
    border-radius: 10px;

    background-color: #f3f3f3;

    cursor: pointer;
    font-weight: 500;

    transition: 0.2s ease;

    &:hover {
        background-color: #e8e8e8;
    }
`

const ApplyButton = styled.button`
    flex: 1;
    height: 40px;

    border: none;
    border-radius: 10px;

    background-color: #111;
    color: white;

    cursor: pointer;
    font-weight: 600;

    transition: 0.2s ease;

    &:hover {
        opacity: 0.9;
    }
`