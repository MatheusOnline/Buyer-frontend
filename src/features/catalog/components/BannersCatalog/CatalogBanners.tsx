import styled from "styled-components";
import { Flex } from "../../../../shared/components/ui/Flex/index.tsx";
import { Carousel } from "../../../../shared/components/ui/Carousel/index.tsx";
export function CatalogBanners() {
  return (
    <CarouselStyled>
      <Carousel/>

      <Flex flexDirection="column" justifyContent="space-between" gap="10px">
        <BannerSmall
          src="https://placehold.co/1200x400/red/white?text=Banner+4"
          alt=""
        />

        <BannerSmall
          src="https://placehold.co/1200x400/yellow/white?text=Banner+6"
          alt=""
        />
      </Flex>
    </CarouselStyled>
  );
}

const CarouselStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;


const BannerSmall = styled.img`
  width: 100%;
   height :80% ;
   max-width: 540px;

  object-fit: cover;

`;