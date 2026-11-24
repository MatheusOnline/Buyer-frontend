import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Text } from "../../../../shared/components/ui/Text/Text.tsx";

//icons
import Camera from "../../../../Assets/Svgs/Category/Camera.svg"
import Cell from "../../../../Assets/Svgs/Category/CellPhone.svg"
import Computer from "../../../../Assets/Svgs/Category/Computer.svg"
import Gamepad from "../../../../Assets/Svgs/Category/Gamepad.svg"
import Headphone from "../../../../Assets/Svgs/Category/Headphone.svg"
import Ball from "../../../../Assets/Svgs/Category/Ball.svg"

type CategoryKey =
  | "eletronic"
  | "clothing"
  | "house"
  | "sports"
  | "headphone"
  | "automotive";

type CategoryData = {
  name: CategoryKey;
  svg: string;
  title: string;
};

const categories: CategoryData[] = [
  { name: "eletronic", svg: Camera , title: "Camera" },
  { name: "clothing", svg: Cell, title: "Celular" },
  { name: "house", svg: Computer, title: "Computador" },
  { name: "automotive", svg: Gamepad , title: "Jogos" },
  { name: "sports", svg: Ball , title: "Esportes" },
  { name: "headphone", svg: Headphone , title: "Fone" },
];

type CategoryProps = {
  name: CategoryKey;
};

export function Category({ name = "eletronic" }: CategoryProps) {
  const navigate = useNavigate()
  const categoryData = categories.find(
    (cat) => cat.name === name
  );

  if (!categoryData) return null;

  return (
    <CategoryStyled onClick={() => navigate(`/search?q=${name}`)}>
      <img src={categoryData.svg} alt={categoryData.title} />

      <Text
        fontSize="medium"
        fontWeight="normal"
        color="primary"
      >
        {categoryData.title}
      </Text>
    </CategoryStyled>
  );
}

const CategoryStyled = styled.button`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutro_color_200};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.neutro_color_300};
  }
`;