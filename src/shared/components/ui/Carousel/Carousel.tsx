import { useState } from "react";
import styled from "styled-components";
import banner from "@assets/Banner/Banner.png"

const images = [
  banner,
  "https://placehold.co/1200x400/blue/white?text=Banner+2",
  "https://placehold.co/1200x400/green/white?text=Banner+3",
];

export const Carousel = () => {
  const [current, setCurrent] = useState(0);

  function nextSlide() {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  function prevSlide() {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  return (
    <Container>

      <ButtonLeft onClick={prevSlide}>
        &lt;
      </ButtonLeft>

      <Slider
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <Slide key={index}>
            <Image src={image} alt="" />
          </Slide>
        ))}
      </Slider>

      <ButtonRight onClick={nextSlide}>
        &gt;
      </ButtonRight>

    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  max-width: 900px;
  margin: auto;
  overflow: hidden;
  position: relative;

  
`;

const Slider = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  min-width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
`;

const Button = styled.button`
  width: 45px;
  height: 45px;

  border: none;

  border-radius: 50%;

  background: rgba(0, 0, 0, 0.5);

  color: white;

  font-size: 22px;

  cursor: pointer;

  position: absolute;

  top: 50%;

  transform: translateY(-50%);

  z-index: 10;

  transition: 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ButtonLeft = styled(Button)`
  left: 15px;
`;

const ButtonRight = styled(Button)`
  right: 15px;
`;