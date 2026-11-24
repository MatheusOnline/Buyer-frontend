import styled from "styled-components"
import { Flex } from "../../../../shared/components/ui/Flex/index.tsx"
import { Text } from "../../../../shared/components/ui/Text/index.tsx"
import { Stepper } from "../../../../shared/components/ui/Stepper/index.tsx"
import { Button } from "../../../../shared/components/ui/Button/index.tsx"
import { BsFillTrash3Fill } from "react-icons/bs";
import type { CartItemProps } from "../../../../types/types.ts"
import { useEffect, useState } from "react"

import { useCartStore } from "../../../../stores/cartStore.ts"
import { useRemoveItemToCart, useIncreaseItemToCart, useDecreaseItemToCart } from "../../../../service/cartService.ts"

export const CartItemCard =({id, title, store, price, image, quantity}: CartItemProps) => {
    const {  selectedIds, toggleItem, removeToggleItem} = useCartStore()    
    const checked = selectedIds.includes(id)
    const { mutate: removeItem} = useRemoveItemToCart();
    const {mutate: increaseItem} = useIncreaseItemToCart()
    const {mutate: decreaseItem} = useDecreaseItemToCart()
    
    const [qnt, setQnt] = useState(quantity)

    useEffect(() => {
        setQnt(quantity)
    }, [quantity])


    function remove(){
        removeToggleItem(id)
        removeItem(id)
    }

    

    return(
        <Container key={id}>
            
            <Imagen src={image} alt="" />

            <Flex flexDirection="column" gap="1px" fullWidth={true} justifyContent="space-between">
                <Flex>
                    <input type="checkbox" checked={checked} onChange={() => toggleItem(id)}/>
                </Flex>
                <Flex flexDirection="row" justifyContent="space-between" alignItems="center" fullWidth={true}>
                    <div>
                        <Text fontSize="medium" fontWeight="semi-bold">{title}</Text>
                        <p>{store}</p>
                    </div>
                    <Text fontSize="medium" fontWeight="semi-bold">R${Number(price).toFixed(2)}</Text>
                </Flex>
                <Flex flexDirection="row" alignItems="center" justifyContent="space-between" gap="1rem" fullWidth={true}>
                    <Stepper value={qnt} onIncrease={() => increaseItem(id)} onDecrease={() => decreaseItem(id)}/>
                    <Button onclick={remove} palette="danger" variant="contained" icon={true}><BsFillTrash3Fill size={18}/></Button>
                </Flex>
            </Flex>  
            
        </Container>
    )
}

const Imagen = styled.img`
    max-width: 130px;
`

const Container = styled.div`
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    gap: 10px;
    width: 100%;
`
