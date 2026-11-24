import React, { useState } from "react";
import styled from "styled-components";

import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = ({ label, type, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password" && showPassword ? "text" : type;

    return (
        <Container>
            {label && <Label>{label}</Label>}

            <InputWrapper>
                <StyledInput
                    {...props}
                    type={inputType}
                />

                {type === "password" && (
                    <PasswordButton
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <MdOutlineVisibility/> : <MdOutlineVisibilityOff/>}
                    </PasswordButton>
                )}
            </InputWrapper>
        </Container>
    );
};

const Container = styled.label`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
`;

const Label = styled.span`
    font-size: 14px;
    font-weight: 500;
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const StyledInput = styled.input`
    width: 100%;
    height: 44px;
    padding: 0 45px 0 12px;

    border: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
    border-radius: 4px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.brand_color_500};
    }
`;

const PasswordButton = styled.button`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);

    border: none;
    background: transparent;

    cursor: pointer;
    font-size: 18px;

    padding: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
`;