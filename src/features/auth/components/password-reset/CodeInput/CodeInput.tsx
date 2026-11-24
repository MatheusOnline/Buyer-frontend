import { useRef, useState } from "react";
import styled from "styled-components";

interface CodeInputProps {
  onChange?: (code: string) => void;
}

export const CodeInput = ({ onChange }: CodeInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);

    setCode(newCode);

    onChange?.(newCode.join(""));

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <Container>
      {code.map((digit, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  width: 48px;
  height: 48px;

  border: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
  border-radius: 8px;

  text-align: center;
  font-size: 20px;
  font-weight: 600;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand_color_500};
  }
`;