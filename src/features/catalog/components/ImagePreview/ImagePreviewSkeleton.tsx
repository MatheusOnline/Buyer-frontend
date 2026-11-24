import styled from "styled-components";
import { Flex } from "../../../../shared/components/ui/Flex/index.tsx";
import { Skeleton } from "../../../../shared/components/ui/Skeleton/Skeleton.tsx";

export const ImagePreviewSkeleton = () => {
  return (
    <ImagePreviewStyled>
      <Flex gap="24px" fullWidth={true} alignItems="stretch">
        <Flex gap="16px" flexDirection="column">
          <Skeleton height="100px" width="100px" />
          <Skeleton height="100px" width="100px" />
          <Skeleton height="100px" width="100px" />
        </Flex>

        <MainImage>
          <Skeleton width="100%" height="400px" />
        </MainImage>
      </Flex>
    </ImagePreviewStyled>
  );
};

const ImagePreviewStyled = styled.div`
  max-width: 50%;
  width: 100%;
`;

const MainImage = styled.div`
  flex: 1;
  display: flex;
`;