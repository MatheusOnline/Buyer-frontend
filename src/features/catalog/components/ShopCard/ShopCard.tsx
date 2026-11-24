import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { Flex } from "../../../../shared/components/ui/Flex/index.tsx";
import { Button } from "../../../../shared/components/ui/Button/index.tsx";
import { Text } from "../../../../shared/components/ui/Text/index.tsx";


type ShopCard = {
    id: string | number,
    img: string
    name: string,
    sales: number,
}


export const ShopCard = ({id, img, name, sales}: ShopCard) => {
    const navigate = useNavigate();
    return(
        <CardStyled key={id}  >
            <Flex gap="10px">
                <ShopImagem src={img} alt="" />
                <Flex gap="3px" flexDirection="column">
                    <Text color="primary" fontSize="medium" fontWeight="semi-bold">{name}</Text>
                    <Text color="secondary" fontSize="small">Produtos {sales} </Text>
                </Flex>
            </Flex>
            <PosButton>
                <Button palette="primary" variant="outlined" onclick={() =>{navigate("/shop")}}>Ver loja</Button>
            </PosButton>
        </CardStyled>
    )
}

const CardStyled = styled.div`
    background-color: ${({ theme }) => theme.colors.background_color};
    border: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
    width: 100%;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

const PosButton = styled.div`
    display: flex;
    justify-content: center;
    
    flex-direction: column;
`

const ShopImagem = styled.img`
    border-radius: 4px;
    min-width: 80px;
    max-width: 80px;
`