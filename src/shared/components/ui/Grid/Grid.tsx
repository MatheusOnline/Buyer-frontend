import type { ReactNode } from "react"
import styled, { css } from "styled-components"

type props = {
  children: ReactNode

  gap?: string
  columns?: string
  rows?: string

  justifyContent?: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly"
  alignItems?: "start" | "center" | "end" | "stretch"

  fullWidth?: boolean
}

export function Grid({
  children,
  gap,
  columns,
  rows,
  justifyContent,
  alignItems,
  fullWidth
}: props) {
  return (
    <GridStyled
      gap={gap}
      columns={columns}
      rows={rows}
      justifyContent={justifyContent}
      alignItems={alignItems}
      fullWidth={fullWidth}
    >
      {children}
    </GridStyled>
  )
}

const GridStyled = styled.div<props>`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  grid-template-rows: ${({ rows }) => rows};

  justify-content: ${({ justifyContent }) => justifyContent || "start"};
  align-items: ${({ alignItems }) => alignItems || "stretch"};

  gap: ${({ gap }) => gap};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}


    

    @media (max-width: 1024px) {
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
`