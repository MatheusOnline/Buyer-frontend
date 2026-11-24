import  type { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    width?: string;
    isHeadle?: boolean
}

export function Modal({
    open,
    onClose,
    title,
    children,
    width = "550px",
    isHeadle
}: ModalProps) {
    if (!open) return null;

    return (
        <Overlay onClick={onClose}>
            <Container
                width={width}
                onClick={(e) => e.stopPropagation()}
            >


                {isHeadle && (
                    <Header>
                        {title && <Title>{title}</Title>}

                        <CloseButton onClick={onClose}>
                            ✕
                        </CloseButton>
                    </Header>
                )}

                <Body>{children}</Body>
            </Container>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;

    background: rgba(0, 0, 0, 0.45);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 9999;

    animation: fadeIn .2s;
`;

const Container = styled.div<{ width: string }>`
    width: ${({ width }) => width};
    max-width: 95%;

    background: ${({ theme }) => theme.colors.background_color};

    border-radius: 10px;

    overflow: hidden;

    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 25px;

    animation: scale .2s;

    @keyframes scale {
        from {
            transform: scale(.95);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px 24px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
`;

const Title = styled.h3`
    margin: 0;
    color: ${({ theme }) => theme.colors.neutro_color_700};
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;

    color: ${({ theme }) => theme.colors.neutro_color_500};

    transition: .2s;

    &:hover{
        color: ${({ theme }) => theme.colors.neutro_color_700};
    }
`;

const Body = styled.div`
    padding: 24px;
`;

