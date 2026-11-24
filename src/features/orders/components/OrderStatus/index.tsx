import styled from "styled-components";

interface OrderStatusProps {
    status: "Pago" | "Preparando" | "Em transporte" | "Entregue";
    dates?: {
        Pago?: string;
        Preparando?: string;
        "Em transporte"?: string;
        Entregue?: string;
    };
}

const steps = [
    "Pago",
    "Preparando",
    "Em transporte",
    "Entregue",
] as const;

export function OrderStatus({ status, dates = {} }: OrderStatusProps) {
    const currentIndex = steps.indexOf(status);

    return (
        <Container>
            {steps.map((step, index) => (
                <Step key={step}>
                    <Circle active={index <= currentIndex} />

                    {index < steps.length - 1 && (
                        <Line active={index < currentIndex} />
                    )}

                    <Label active={index <= currentIndex}>
                        {step}
                    </Label>

                    <Time active={index <= currentIndex}>
                        {dates[step] ?? "--/-- --:--"}
                    </Time>
                </Step>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
`;

const Step = styled.div`
    position: relative;
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Circle = styled.div<{ active: boolean }>`
    width: 18px;
    height: 18px;
    border-radius: 50%;

    background: ${({ active, theme }) =>
        active ? theme.colors.brand_color_400 : "#D1D5DB"};

    z-index: 2;
`;

const Line = styled.div<{ active: boolean }>`
    position: absolute;
    top: 8px;
    left: 50%;

    width: 100%;
    height: 2px;

    background: ${({ active, theme }) =>
        active ? theme.colors.brand_color_400 : "#D1D5DB"};
`;

const Label = styled.span<{ active: boolean }>`
    margin-top: 10px;
    font-size: 13px;
    text-align: center;

    color: ${({ active, theme }) =>
        active
            ? theme.colors.brand_color_400
            : theme.colors.neutro_color_500};

    font-weight: ${({ active }) => (active ? 600 : 400)};
`;

const Time = styled.span<{ active: boolean }>`
    margin-top: 4px;
    font-size: 11px;
    text-align: center;

    color: ${({ active, theme }) =>
        active
            ? theme.colors.neutro_color_600
            : theme.colors.neutro_color_400};
`;