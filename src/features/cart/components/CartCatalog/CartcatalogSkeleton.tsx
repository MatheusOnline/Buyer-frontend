import { Skeleton } from "../../../../shared/components/ui/Skeleton/index.tsx"

import styled from "styled-components"



export const CartCatalogSkeleton = () => {
    
    return(
        <Container>
           <Skeleton height="150px"/>
           <Skeleton height="150px"/>
           <Skeleton height="150px"/>
           <Skeleton height="150px"/>
           
        </Container>
        
    )
}

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #ccc;
    gap: 10px;
`    
