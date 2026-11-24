import { useCallback } from "react";
import type { ReactNode } from "react";
import styled, { css } from "styled-components";

type props ={
    children: ReactNode;
    type?: "submit" | "reset" | "button";
    palette?: "primary" | "secondary" | "neutral" | "danger";
    variant?: "contained" | "outlined" | "text" ;
    icon?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    onclick?:  React.MouseEventHandler<HTMLButtonElement>;
    maxWidth?: string;
    maxHeight?: string;
}

export function Button({ children, type = "button", palette, variant, disabled, fullWidth, icon, maxWidth, maxHeight, onclick }: props) {
    const getClassName = useCallback(() => {
      return `$ __button-${variant} __button-${variant}-${palette} `  
    }, [palette, variant,])

    
    return(
        <ButtonStyled type={type} disabled={disabled} className={getClassName()} fullWidth={fullWidth} icon={icon} maxWidth={maxWidth} maxHeight={maxHeight} onClick={onclick}>
            {children}
        </ButtonStyled>

    )
}

Button.displayName = 'Button'

const ButtonStyled = styled.button<props>`
    box-sizing: border-box;
    border: 1px solid transparent;
    
    cursor: pointer;
    font-weight: 400;
    font-size: clamp(12px, 1.2vw, 14px);
    border-radius: 4px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    height: fit-content;
    padding: clamp(6px, 1vw, 10px) clamp(10px, 2vw, 16px);
   
    max-width: ${({ maxWidth }) => maxWidth};
    max-height: ${({ maxHeight }) => maxHeight};


    //Definição de estilos para os botoes CONTAINED
    &.__button-contained {
        
        color: ${({ theme }) => theme.colors.neutro_color_200};
        
        transition: background-color 0.3s ease;

        &.__button-contained-primary {
            background: ${({ theme }) => theme.colors.brand_color_600};
        
            &:hover{
                background: ${({ theme }) => theme.colors.brand_color_700};
            
            }
            &:active{
                background: ${({ theme }) => theme.colors.brand_color_700};
            }
        }

        
        &.__button-contained-secondary {
            background-color: ${({ theme }) => theme.colors.secondary_color_400};

            &:hover{
                background-color: ${({ theme }) => theme.colors.secondary_color_500};
            }
            &:active{
                background-color: ${({ theme }) => theme.colors.secondary_color_600};
            }
        }


        &.__button-contained-neutral {
            color: ${({ theme }) => theme.colors.neutro_color_500};
            background-color: ${({ theme }) => theme.colors.neutro_color_300};
        
            &:hover{
                background-color: ${({ theme }) => theme.colors.neutro_color_400};
            }
            &:active{
                background-color: ${({ theme }) => theme.colors.neutro_color_500};
            }
        }


        &.__button-contained-danger {
             background-color: ${({ theme }) => theme.colors.feedback_color_red};
        }
        
    }

     //Definição de estilos para os botoes OUTLINED
    &.__button-outlined {
        background: transparent;
        border: 1px solid;
        transition: background-color 0.3s ease, color 0.3s ease;
        

        &.__button-outlined-primary {
            border-color: ${({ theme }) => theme.colors.brand_color_600};
            color: ${({ theme }) => theme.colors.brand_color_600};
            
            &:hover{
                background-color: ${({ theme }) => theme.colors.brand_color_200};
               
            }
            &:active{
                background-color: ${({ theme }) => theme.colors.brand_color_300};
            }
        }

        &.__button-outlined-secondary {
            border-color: ${({ theme }) => theme.colors.secondary_color_400};
            color: ${({ theme }) => theme.colors.secondary_color_400};

            &:hover{
                background-color: ${({ theme }) => theme.colors.secondary_color_200};
                
            }
            &:active{
                background-color: ${({ theme }) => theme.colors.secondary_color_300};
            }
        }

        &.__button-outlined-neutral {
            border-color: ${({ theme }) => theme.colors.neutro_color_500};
            color: ${({ theme }) => theme.colors.neutro_color_500}; 

            &:hover{
                background-color: ${({ theme }) => theme.colors.neutro_color_300};
                
            }
            &:active{
                background-color: ${({ theme }) => theme.colors.neutro_color_400};
            }
        }
    }

    //Definiçao de estilo para os botoes TEXT
    &.__button-text {
        background-color: transparent;
        border: none;
        transition: background-color 0.3s ease, color 0.3s ease;

         &.__button-text-primary {
            
            color: ${({ theme }) => theme.colors.brand_color_600};
            
            &:hover{
                color: ${({ theme }) => theme.colors.brand_color_700};
               
            }
            &:active{
                color: ${({ theme }) => theme.colors.brand_color_700};
            }
        }


         &.__button-text-secondary {
            color: ${({ theme }) => theme.colors.secondary_color_400};

            &:hover{
                color: ${({ theme }) => theme.colors.secondary_color_500};
            }
            &:active{
                color: ${({ theme }) => theme.colors.secondary_color_600};
            }
        }


        &.__button-text-neutral {
            color: ${({ theme }) => theme.colors.neutro_color_300};
        
            &:hover{
                color: ${({ theme }) => theme.colors.neutro_color_400};
            }
            &:active{
                color: ${({ theme }) => theme.colors.neutro_color_500};
            }
        }

    }

    ${({ fullWidth }) => fullWidth && css`
            width: 100%;
        `}

    ${({ disabled }) => disabled && css`
        opacity: 0.40;
        pointer-events: none;
        cursor: not-allowed ;
    `}

    ${({ icon }) => icon && css`
        padding: 8px 8px;
        box-sizing: border-box;
        width: 40px;
    `}

`
