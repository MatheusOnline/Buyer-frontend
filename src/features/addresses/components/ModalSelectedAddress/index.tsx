import styled from "styled-components";
import { useState } from "react";
import { Modal } from "../../../../shared/components/ui/Modal/index.tsx"
import { Flex } from "../../../../shared/components/ui/Flex/index.tsx";
import { Text } from "../../../../shared/components/ui/Text/index.tsx";
import { Button } from "../../../../shared/components/ui/Button/index.tsx";

import { useListAddress } from "../../../../service/addressService.ts";
import { useUpdateAddress } from "../../../../service/checkoutService.ts";
import { ModalCreateAddress } from "../ModalCreateAddress/index.tsx";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    checkoutId?: string;
    onSuccess?: () => void;
}



export const ModalSelectedAddress = ({open, onClose, checkoutId, onSuccess}: ModalProps) => {
    const {data} = useListAddress();
    const updateAddress = useUpdateAddress();
    const [isCreateMode, setIsCreateMode] = useState(false);

    const handleSelectAddress = async (addressId: string) => {
        if (!checkoutId) return;

        try {
            await updateAddress.mutateAsync({
                checkout_id: checkoutId,
                address_id: addressId
            });

            onClose();
            onSuccess?.();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseCreateAddress = () => {
        setIsCreateMode(false);
    };

    return(
        <>
            <Modal open={open} onClose={onClose} >
                <Flex gap="15px" flexDirection="column">
                    <Flex flexDirection="column">
                        <Flex alignItems="center"> <Text fontSize="large">Endereços </Text> <Text fontSize="small">({data?.data?.length || 0}/3)</Text> </Flex>
                        <Text color="secondary">Selecione um endereço para entrega</Text>
                    </Flex>
                    {data?.data.map((item:any) => (
                        <ContainerAddress key={item.id} >
                            <Flex flexDirection="column" gap="5px">
                                <Text fontSize="medium" fontWeight="bold">{item.label}</Text>
                                <Text fontSize="normal" fontWeight="normal">{item.street} {item.number} | {item.city}</Text>
                            </Flex>

                            <Button
                                variant="contained"
                                palette="primary"
                                onclick={() => handleSelectAddress(item.id)}
                            >
                                Selecionar
                            </Button>
                        </ContainerAddress>
                    ))}
                    <Button
                        variant="contained"
                        palette="neutral"
                        onclick={() => setIsCreateMode(true)}
                    >
                        Adicionar novo endereço
                    </Button>
                </Flex>
            </Modal>

            <ModalCreateAddress
                checkoutId={checkoutId}
                open={isCreateMode}
                onClose={handleCloseCreateAddress}
                onSuccess={() => {
                    setIsCreateMode(false);
                    onClose();
                    onSuccess?.();
                }}
            />
        </>
    )

}


const ContainerAddress = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
    justify-content: space-between;
    padding: 12px;
    border-radius: 4px;
`

