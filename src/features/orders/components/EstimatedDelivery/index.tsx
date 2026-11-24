import styled from "styled-components";
import { FiClock } from "react-icons/fi";

interface EstimatedDeliveryProps {
    estimatedTime: string;
    estimatedDate?: string;
}

export function EstimatedDelivery({
    estimatedTime,
    estimatedDate = "Hoje"
}: EstimatedDeliveryProps) {
    return (
        <Container>
            <IconContainer>
                <FiClock size={24} />
            </IconContainer>

            <Content>
                <Title>Previsão de entrega</Title>

                <Time>
                    {estimatedDate} às {estimatedTime}
                </Time>

                <Subtitle>
                    A loja está preparando seu pedido.
                </Subtitle>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 18px;

    border-radius: 10px;

    background: ${({ theme }) => theme.colors.brand_color_500};

    border: 1px solid ${({ theme }) => theme.colors.brand_color_200};
`;

const IconContainer = styled.div`
    width: 48px;
    height: 48px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.colors.brand_color_400};
    color: white;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutro_color_600};
`;

const Time = styled.span`
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.brand_color_400};
`;

const Subtitle = styled.span`
    margin-top: 4px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.neutro_color_500};
`;