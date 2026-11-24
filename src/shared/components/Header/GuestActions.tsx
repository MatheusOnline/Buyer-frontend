import styled from "styled-components";
import { Flex } from "../ui/Flex/index.tsx"
import { Link } from "react-router-dom";
import { DropdownMenu } from "../ui/MenuDropbox/index.tsx";
// INCONS DO HEADER DE AÇÃO
import IconUser from "../../../Assets/Svgs/UserNormal.svg"
import IconLike from "../../../Assets/Svgs/HeartNormal.svg"
import IconCart from "../../../Assets/Svgs/CartNormalBlack.svg"

import { useGetCart } from "../../../service/cartService.ts";

export const GuestActions = () => {
    const {data} = useGetCart()
    return(
        <>
            <ActionsDesktop>
                <Flex gap={"15px"}>
                    <ButtonStyled to="/profile"  >
                        <img src={IconUser} alt="User" />
                    </ButtonStyled>
                    <ButtonStyled  to="/favorites" >
                        <img src={IconLike} alt="Like" />
                    </ButtonStyled>
                    <CartWrapper  to="/cart" >
                        <img src={IconCart} alt="Cart" />
                        <CartBadge>{data?.data?.length || 0}</CartBadge>
                    </CartWrapper>
                </Flex>
            </ActionsDesktop>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger />

                <DropdownMenu.Content>
                    <DropdownMenu.Item icon={IconUser}>
                        Perfil
                    </DropdownMenu.Item>

                    <DropdownMenu.Item icon={IconLike}>
                        Favoritos
                    </DropdownMenu.Item>

                    <DropdownMenu.Item icon={IconCart}>
                        Carrinho
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </>
    )
}


const ActionsDesktop = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;


const ButtonStyled = styled(Link)`
    border: none;
    background: transparent;
    transition: 0.3s ease;
    cursor: pointer;    
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    img{
        width: 90%;
    }
`

const CartWrapper = styled(Link)`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  border-radius: 50%;

  transition: 0.3s ease;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  img {
    width: 90%;
  }
`;

const CartBadge = styled.span`
  position: absolute;

  top: 0px;
  right: 0px;

  background: red;
  color: white;

  font-size: 12px;
  font-weight: bold;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
