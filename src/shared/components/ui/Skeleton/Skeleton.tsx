import styled, { keyframes } from "styled-components";

type SkeletonProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
};

export const Skeleton = ({width = "100%", height = "20px", borderRadius = "8px",}: SkeletonProps) => {
  return (
    <SkeletonStyled
      width={width}
      height={height}
      borderRadius={borderRadius}
    />
  );
};

const loading = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

const SkeletonStyled = styled.div<SkeletonProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  border-radius: ${({ borderRadius }) => borderRadius};

  background: linear-gradient(
    90deg,
    #e5e5e5 25%,
    #f5f5f5 50%,
    #e5e5e5 75%
  );

  background-size: 200% 100%;

  animation: ${loading} 1.5s infinite linear;
`;