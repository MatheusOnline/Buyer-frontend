import styled from "styled-components"

type LineProps = {
    direction?: "horizontal" | "vertical";
}

export function Line({ direction = "horizontal" }: LineProps) {
    const className = `__${direction}`

    return(
        <LineStyled className={className} >
        
        </LineStyled>
    )
}

const LineStyled = styled.div<LineProps>`
    background-color: ${({ theme }) => theme.colors.neutro_color_300};
   
    &.__horizontal {
        width: 100%;
        height: 1px;
    }

    &.__vertical {
        width: 1px;
        
    }
`