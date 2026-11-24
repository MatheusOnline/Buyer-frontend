import  {BenefitsCard}  from "../BenefitsCard/index.tsx";
import { Flex } from "../ui/Flex/Flex.tsx";
import { Line } from "../ui/Line/Line.tsx";
export function BenefitsBar() {
    return(
        <Flex flexDirection="row"  fullWidth={true} justifyContent="space-between" >
            <BenefitsCard variant="delivery" />
            <Line direction="vertical" />   
            
            <BenefitsCard variant="payment" />
            <Line direction="vertical" />   
            
            <BenefitsCard variant="support" />
            <Line direction="vertical" />   
            
            <BenefitsCard variant="refund" />
        </Flex>
    )
}