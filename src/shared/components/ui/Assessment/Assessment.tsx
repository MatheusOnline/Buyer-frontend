import styled from "styled-components"
import { Text } from "../Text/index.tsx"

type AssessmentProps = {
  value: number // 0 a 5
}

export function Assessment({ value }: AssessmentProps) {
  const safeValue = Math.max(0, Math.min(5, value))
  const percentage = (safeValue / 5) * 100

  return (
    <AssessmentStyled>
    <Wrapper>
      <StarsBackground>★★★★★</StarsBackground>

      <StarsFill style={{ width: `${percentage}%` }}>
        ★★★★★
      </StarsFill>
    
    </Wrapper>
      <Text fontSize="extra-small">({value})</Text>
  </AssessmentStyled>
  )
}

const AssessmentStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  `

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  line-height: 1;
`

const StarsBackground = styled.div`
  color: #ccc;
`

const StarsFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  color: #f5a623;
`