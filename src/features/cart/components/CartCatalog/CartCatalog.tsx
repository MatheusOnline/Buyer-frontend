import styled from "styled-components"
import { CartItemCard } from "../CartItemCard/CartItemCard.tsx"
import type { CartItemProps } from "../../../../types/types.ts"
import { CartCatalogSkeleton } from "./CartcatalogSkeleton.tsx"

type CartCatalogProps = {
    items: CartItemProps[]
    isLoading: boolean
}

export const CartCatalog = ({items, isLoading}: CartCatalogProps) => {
    if(isLoading){
        return(
            <CartCatalogSkeleton/>
        )
    }    


    return(
        <Container>
            {
            items?.map((item) => (
                <CartItemCard 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    store="teste"
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                />
            ))
            }
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
