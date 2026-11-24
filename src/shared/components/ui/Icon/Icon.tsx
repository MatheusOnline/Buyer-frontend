import styled from "styled-components";

type IconProps = {
    icon: string;
    size?: number;
};

export const Icon = ({
    icon,
    size = 24,
}: IconProps) => {
    return (
        <IconWrapper size={size}  src={icon}/>
           
        
    );
};

const IconWrapper = styled.img<{ size: number }>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;

   

   
`;