import styled from "styled-components"
import { Button } from "../../../../shared/components/ui/Button/index.tsx"
import { Modal } from "../../../../shared/components/ui/Modal/index.tsx"
import { Input } from "../../../../shared/components/ui/Input/Input.tsx"
import { useState } from "react"
import { useCreateAddress } from "../../../../service/addressService.ts"
import { useUpdateAddress } from "../../../../service/checkoutService.ts"


interface ModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    checkoutId?: string;
}

export const ModalCreateAddress = ({ open, onClose, onSuccess, checkoutId }: ModalProps) => {

    const createAddress = useCreateAddress();
    const updateCheckoutAddress = useUpdateAddress();
    
    
    
    
    const [label, setLabel] = useState("");
    const [postal_code, setPostal_code] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [reference, setReference] = useState("")
    const [complement, setComplement] = useState("")
    const [number, setNumber] = useState("")

    async function handleCreateAddress() {
        try {
            const result = await createAddress.mutateAsync(
                {
                    label,
                    postal_code,
                    city,
                    street,
                    district,
                    reference,
                    complement,
                    number
                }
            )

            const createdAddress = result?.data ?? result;

            if (checkoutId && createdAddress?.id) {
                await updateCheckoutAddress.mutateAsync({
                    checkout_id: checkoutId,
                    address_id: createdAddress.id
                });
            }

            handleCloseModal()
            onSuccess?.();
        }catch (error) {
            console.log(error)
        }
    }

    function handleCloseModal(){
        setPostal_code("")
        setCity("")
        setDistrict("")
        setStreet("")
        setReference("")
        setComplement("")
        setNumber("")
        setLabel("")

        onClose()
    } 

    async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/\D/g, "");

        // Limita a 8 números
        value = value.slice(0, 8);

        // Máscara 00000-000
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
        }

        setPostal_code(value);

        // Remove a máscara para consultar o ViaCEP
        const cleanCep = value.replace(/\D/g, "");

        if (cleanCep.length === 8) {
            const address = await buscarCEP(cleanCep);

            if (address) {
                setCity(address.localidade);
                setStreet(address.logradouro);
                setDistrict(address.bairro);
            }
        }
    }

    const buscarCEP = async (cep: string) => {
        cep = cep.replace(/\D/g, "");

        if (cep.length !== 8) return null;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                return null;
            }

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };


    return(
         <Modal open={open} onClose={onClose} isHeadle={false}>
                <Content>
                    <Title>Novo Endereço</Title>

                    <Row>
                        <InputContainer>
                            <Label>Cidade</Label>

                            <Select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="Umuarama">Umuarama</option>
                            </Select>
                        </InputContainer>

                        <Input label="Nome do endereço" value={label} onChange={(e) => {setLabel(e.target.value)}} placeholder="Ex: Casa, Trabalho..." required/>
                    </Row>

                    <Row>
                        <Input label="CEP" value={postal_code} onChange={handleCepChange} required/>
                        <Input label="Número" value={number} onChange={(e) => setNumber(e.target.value)} required/>
                    </Row>

                    <Input label="Rua" value={street} onChange={(e) => setStreet(e.target.value)} required/>

                    <Input label="Bairro" value={district} onChange={(e) => setDistrict(e.target.value)} required/>

                    <Input label="Ponto de referência" value={reference} onChange={(e) => setReference(e.target.value)} />

                    <InputContainer>
                        <Label>Complemento</Label>
                        <Textarea placeholder="Apartamento, bloco, fundos, etc." value={complement} onChange={(e) => setComplement(e.target.value)}/>
                    </InputContainer>

                    <Footer>
                        <Button variant="outlined" palette="neutral" onclick={() => handleCloseModal()}>
                            Cancelar
                        </Button>

                        <Button palette="primary"type="button" variant="contained" onclick={handleCreateAddress}>
                            Salvar Endereço
                        </Button>
                    </Footer>
                </Content>
            </Modal>
    )
}

const Content = styled.div`
    width: 100%;
    max-width: 600px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    background: ${({ theme }) => theme.colors.background_color};
    padding: 28px;
    border-radius: 12px;
`;

const Title = styled.h2`
    color: ${({ theme }) => theme.colors.neutro_color_700};
    
`;


const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: .9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutro_color_700};
`;

const Select = styled.select`
    width: 100%;
    height: 44px;

    padding: 0 14px;

    border: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
    border-radius: 8px;

    background: #fff;
    outline: none;

    &:focus {
        border-color: ${({ theme }) => theme.colors.brand_color_400};
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    min-height: 100px;

    padding: 12px 14px;

    border: 1px solid ${({ theme }) => theme.colors.neutro_color_300};
    border-radius: 8px;

    outline: none;
    resize: none;
    &:focus {
        border-color: ${({ theme }) => theme.colors.brand_color_400};
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 10px;
`;