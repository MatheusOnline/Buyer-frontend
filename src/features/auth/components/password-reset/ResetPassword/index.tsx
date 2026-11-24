import styled from "styled-components";
import { FiMail } from "react-icons/fi";
import { Button } from "../../../../../shared/components/ui/Button/index.tsx";
import { Text } from "../../../../../shared/components/ui/Text/index.tsx";

interface ResetPasswordSentProps {
    email: string;
    onClose: () => void;
}

export function ResetPasswordSent({
    email,
    onClose,
}: ResetPasswordSentProps) {
    return (
        <Container>
            <IconContainer>
                <FiMail size={36} />
            </IconContainer>

            <Title>Verifique seu e-mail</Title>

            <Description>
                Enviamos um link para redefinição de senha para:
            </Description>

            <Email>{email}</Email>

            <Description>
                Utilize o link recebido para criar uma nova senha. Se não encontrar o e-mail, verifique a caixa de spam.
            </Description>

            <Button
                variant="contained"
                palette="primary"
                onclick={onClose}
            >
                Entendi
            </Button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    text-align: center;

    padding: 10px 0;
`;

const IconContainer = styled.div`
    width: 70px;
    height: 70px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid  ${({ theme }) => theme.colors.brand_color_500};
    color: ${({ theme }) => theme.colors.brand_color_400};
`;

const Title = styled.h3`
    margin: 0;
    color: ${({ theme }) => theme.colors.neutro_color_700};
`;

const Description = styled(Text)`
    max-width: 340px;
    color: ${({ theme }) => theme.colors.neutro_color_500};
`;

const Email = styled.span`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutro_color_700};
`;