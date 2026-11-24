import type { MouseEvent } from "react";
import { styled } from "styled-components";
import { Button } from "../Button/index.tsx";
import { Text } from "../Text/index.tsx";
import { Flex } from "../Flex/index.tsx";

type StepperProps = {
    value: number;
    onIncrease: (value: number) => void;
    onDecrease: (value: number) => void;
    min?: number;
    max?: number;
};

export const Stepper = ({ value, onDecrease, onIncrease, min = 1, max }: StepperProps) => {
    const increment = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (max !== undefined && value >= max) return;
        onIncrease(value + 1);
    };

    const decrement = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (value <= min) return;
        onDecrease(value - 1);
    };

    return (
        <BorderColor>
            <StepperStyled gap="12px" alignItems="center">
                <Button type="button" variant="outlined" palette="neutral" onclick={decrement}>
                    <Text color="primary">-</Text>
                </Button>

                <ValueContainer>
                    <Text>{value}</Text>
                </ValueContainer>

                <Button type="button" variant="outlined" palette="neutral" onclick={increment}>
                    <Text color="primary">+</Text>
                </Button>
            </StepperStyled>
        </BorderColor>
    );
};

const BorderColor = styled.div`
    border: 1px solid #E0E0E0;
    max-width: fit-content;
    border-radius: 4px;
`;

const StepperStyled = styled(Flex)`
    width: fit-content;
    border: 1px solid #E0E0E0;
`;

const ValueContainer = styled.div`
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;