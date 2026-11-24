import styled from "styled-components"

import { Skeleton } from "../../../../shared/components/ui/Skeleton/index.tsx"
export const CartSummarySkeleton = () => {
    return(
        <ContainerStyled>
            <Skeleton width="100%" height="250px"/>
        </ContainerStyled>
    )
}


const ContainerStyled = styled.div`
    width: 50%;
    max-height: 250px   ;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`