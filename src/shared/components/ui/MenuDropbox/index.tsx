import {createContext, useContext, useState,} from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownContext = createContext({} as DropdownContextType);

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <Container>
        {children}
      </Container>
    </DropdownContext.Provider>
  );
};

const Trigger = () => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  return (
    <TriggerButton onClick={() => setIsOpen(!isOpen)}>
      ☰
    </TriggerButton>
  );
};

type ContentProps = {
  children: ReactNode;
};

const Content = ({ children }: ContentProps) => {
  const { isOpen } = useContext(DropdownContext);

  if (!isOpen) return null;

  return <Dropdown>{children}</Dropdown>;
};

type ItemProps = {
  children: ReactNode;
  icon?: string;
  onClick?: () => void;
};

const Item = ({ children, icon, onClick }: ItemProps) => {
  return (
    <ItemButton onClick={onClick}>
      {icon && <img src={icon} alt="" />}

      {children}
    </ItemButton>
  );
};

export const DropdownMenu = {
  Root,
  Trigger,
  Content,
  Item,
};

const Container = styled.div`
  position: relative;

  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const TriggerButton = styled.button`
  border: none;
  background: transparent;

  font-size: 28px;

  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;

  top: 50px;
  right: 0;

  width: 220px;

  background: white;

  border-radius: 12px;

  padding: 12px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 20px;

  z-index: 100;
`;

const ItemButton = styled.button`
  width: 100%;

  border: none;
  background: transparent;

  padding: 12px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  gap: 12px;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  img {
    width: 22px;
  }
`;