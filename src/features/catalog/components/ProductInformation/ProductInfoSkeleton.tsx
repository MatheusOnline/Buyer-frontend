import styled from "styled-components"
import { Flex } from "../../../../shared/components/ui/Flex/index.tsx"


import { Skeleton } from "../../../../shared/components/ui/Skeleton/index.tsx"


export const ProductInfoSkeleton = () => {
    return(
        <ContainedInfo>
                            <Flex flexDirection="column" gap="16px" >
                                <Skeleton width="100%" height="20px" />
                                <Skeleton width="100%" height="20px" />
                                <Skeleton width="100%" height="50px" />
                                <Skeleton width="100%" height="20px" />
                                
                                
                                <Flex gap="26px" flexDirection="column" >
                                    <Flex gap="8px" alignItems="center" >
                                        <Skeleton width="100%" height="60px" />
                                        <Skeleton width="100%" height="60px" />
                                    </Flex>
                                    
                                    <Skeleton width="100%" height="60px" />
                                </Flex>
                            </Flex>
                        </ContainedInfo>
    
    )
}

const ContainedInfo = styled.div`
    max-width: 500px;
    min-width: 400px;
    border: 1px solid #FFFFFF;
`