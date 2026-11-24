import styled from "styled-components";
import { FiMapPin } from "react-icons/fi";

interface OrderAddressProps {
    recipient: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    complement?: string;
}

export function OrderAddress({
    recipient,
    street,
    number,
    district,
    city,
    state,
    zipCode,
    complement
}: OrderAddressProps) {
    return (
        <Container>
            <IconContainer>
                <FiMapPin size={22} />
            </IconContainer>

            <Content>
                <Title>Endereço de entrega</Title>

                <Recipient>{recipient}</Recipient>

                <Address>
                    {street}, {number}
                    {complement && ` - ${complement}`}
                </Address>

                <Address>
                    {district}
                </Address>

                <Address>
                    {city} - {state}
                </Address>

                <Address>
                    CEP {zipCode}
                </Address>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    gap: 16px;

    padding: 18px;

    border: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
    border-radius: 10px;

    background: ${({ theme }) => theme.colors.background_color};
`;

const IconContainer = styled.div`
    width: 48px;
    height: 48px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.colors.brand_color_200};
    color: ${({ theme }) => theme.colors.brand_color_400};

    flex-shrink: 0;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Title = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutro_color_700};
`;

const Recipient = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutro_color_700};
`;

const Address = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutro_color_500};
`;