import { useState } from "react";
import styled from "styled-components";
import { Line } from "../Line/index.tsx";
type AccordionProps = {
    title: string;
    children: React.ReactNode;
};

export const Accordion = ({ title, children }: AccordionProps) => {
    const [open, setOpen] = useState(true);

    return (
        <Container>
            <Line />
            <Header onClick={() => setOpen(!open)}>
                <h3>{title}</h3>

                <span>
                    {open ? "⌃" : "⌄"}
                </span>
            </Header>

            {
                open && (
                    <Content>
                        {children}
                    </Content>
                )
            }
        </Container>
    );
};

const Container = styled.div`

`;

const Header = styled.button`
    width: 100%;
    border: none;
    background: transparent;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 16px 0px;
    cursor: pointer;

    h3{
        color: #009dff;
        font-size: 20px;
        font-weight: 500;
    }

    span{
        font-size: 24px;
        color: #009dff;
    }
`;

const Content = styled.div`
    padding: 16px 0px;
    border-top: 1px solid #e5e5e5;
`;