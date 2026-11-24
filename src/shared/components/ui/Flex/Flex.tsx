import type { ReactNode } from "react";
import styled, { css } from "styled-components";

type props = {
    children: ReactNode;
    gap?: string;
    justifyContent?: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
    alignItems?: "start" | "center" | "end" | "stretch";
    flexDirection?: "row" | "column";
    
    fullWidth?: boolean;
}

export function Flex({ children, gap, justifyContent, alignItems, flexDirection, fullWidth }: props){
    return(
        <FlexStyled gap={gap} justifyContent={justifyContent} alignItems={alignItems} flexDirection={flexDirection} fullWidth={fullWidth}>
            {children}
        </FlexStyled>
    )
}

 


const FlexStyled = styled.div<props>`
    display: flex;
    flex-direction: ${props => props.flexDirection || "row"};
    justify-content: ${props => props.justifyContent || "start"};
    align-items: ${props => props.alignItems || "stretch"};
    gap: ${props => props.gap};

    ${({ fullWidth }) => fullWidth && css`
            width: 100%;
        `}
    `

