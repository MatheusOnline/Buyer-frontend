import type { ReactNode } from "react"
import styled from "styled-components"

type props = {
    children: ReactNode;
    fontWeight?: "normal" | "semi-bold" | "bold";
    fontSize?: "extra-small" | "small" | "normal" | "medium" | "large";
    color?: "primary" | "secondary" | "white" | "brand";
    truncate?: boolean
    maxWidth?: string
    underline?: boolean
    through?: boolean
}

export function Text({ children, fontWeight, fontSize, color = "primary" , truncate = false, maxWidth, underline = false, through}: props) {
    const className = `__text-weight-${fontWeight} __text-scale-${fontSize} __text-color-${color} `

    return(
        <TextStyled fontWeight={fontWeight} fontSize={fontSize}  className={className}  truncate={truncate} maxWidth={maxWidth} underline={underline} through={through}>
            {children}
        </TextStyled>
    )

}

const TextStyled = styled.p<props>`
    max-width: ${({ maxWidth }) => maxWidth || "100%"};
    
    ${({ truncate }) =>
        truncate &&
        `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    `}

    ${({ underline }) =>
        underline &&
        `
        text-decoration: underline;
    `}
    
    ${({ through }) =>
        through &&
        `
        text-decoration: line-through;
    `}

    &.__text-color-primary {
        color: ${({ theme }) => theme.colors.neutro_color_700};
    }
    &.__text-color-secondary {
        color: ${({ theme }) => theme.colors.neutro_color_500};
    }
    &.__text-color-white {
        color: ${({ theme }) => theme.colors.neutro_color_200};
    }
    &.__text-color-brand {
        color: ${({ theme }) => theme.colors.brand_color_400};
    }

    &.__text-weight-normal {
        font-weight: 300;
    }
    &.__text-weight-semi-bold {
        font-weight: 500;
    }
    &.__text-weight-bold {
        font-weight: 700;
    }

    &.__text-scale-extra-small {
        font-size: ${({ theme }) => theme.fonts.extra_small};
    }

    &.__text-scale-small {
        font-size: ${({ theme }) => theme.fonts.small};
    }
    &.__text-scale-normal {
        font-size: ${({ theme }) => theme.fonts.normal};
    }
    &.__text-scale-medium {
        font-size: ${({ theme }) => theme.fonts.medium};
    }
    &.__text-scale-large {
        font-size: ${({ theme }) => theme.fonts.large};
    }

    
`