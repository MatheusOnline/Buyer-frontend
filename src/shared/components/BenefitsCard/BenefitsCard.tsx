import styled from "styled-components"
import { Text } from "../ui/Text/index.tsx"



import packageIcon from "../../../Assets/Svgs/PackageNormal.svg"
import creditCardIcon from "../../../Assets/Svgs/CreditNormal.svg"
import headphoneIcon from "../../../Assets/Svgs/HeadphonesNormal.svg"
import verifildIcon from "../../../Assets/Svgs/TruckNormal.svg"


const variations = {
  delivery: {
    icon: packageIcon,
    title: "ENTREGA RÁPIDA",
    description: "Entrega 24h"
  },
  payment: {
    icon: creditCardIcon,
    title: "PAGAMENTO SEGURO",
    description: "Seu dinheiro está seguro"
  },
  support: {
    icon: headphoneIcon,
    title: "SUPORTE 24/7",
    description: "Atendimento em tempo real"
  },
  refund: {
    icon: verifildIcon,
    title: "DEVOLUÇÃO EM 24 HORAS",
    description: "Garantia de reembolso de 100%"
  }
} as const

type BenefitVariant = keyof typeof variations

type BenefitsCardProps = {
  variant?: BenefitVariant
}

export function BenefitsCard({ variant = "delivery" }: BenefitsCardProps) {
    const data = variations[variant]

    return (
        <BenifitsCardStyled>
            <img src={data.icon} alt={data.title} />
            <div>
                <Text fontWeight="semi-bold" fontSize="normal">
                {data.title}
                </Text>
                <Text fontWeight="normal" fontSize="small" color="secondary">
                    {data.description}
                </Text>
            </div>
        </BenifitsCardStyled>
    )
}

const BenifitsCardStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`



