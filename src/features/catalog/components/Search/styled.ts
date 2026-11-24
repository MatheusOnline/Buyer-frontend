import styled from "styled-components";

export const ContainerSearch = styled.div`
  width: 100%;
  max-width: clamp(180px, 30vw, 800px);

  display: flex;
  align-items: center;

  border: 2px solid var(--neutro_color_200);
  border-radius: 8px;

  height: clamp(36px, 3vw, 50px);

  overflow: hidden;

  transition: 0.2s;

  &:focus-within {
    border-color: var(--brand_color_300);
  }
`;

export const InputSearch = styled.input`
  border: none;
  width: 100%;
  height: 100%;

  padding: 0 12px;

  font-size: clamp(12px, 1vw, 16px);

  &:focus {
    outline: none;
  }
`;