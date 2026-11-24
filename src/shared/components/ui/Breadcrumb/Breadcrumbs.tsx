import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '../Text/index.tsx';
import { Flex } from '../Flex/index.tsx';
import { BreadcrumbsSkeleton } from './BreadcrumbsSkeleton.tsx';
import { Icon } from '../Icon/Icon.tsx';

import  HouseIcon from "@assets/Svgs/regular/House.svg"

type BreadcrumbItem = {
  path?: string[];
  label: string;
  isLoading: boolean
}

export const Breadcrumbs = ({ path, label, isLoading }: BreadcrumbItem ) => {

  if(isLoading){
    return(
      <BreadcrumbsSkeleton/>
    )
  }
 
  return (
    <Flex gap="8px" alignItems="center" >
      <>
      
      <Links to="/"><Flex alignItems='center' gap='2px'> <Icon icon={HouseIcon} size={18}/><Text  fontSize="small">Home</Text></Flex></Links  > 
      </>
      <Text fontSize="small">/</Text>

      {
        path?.map((item) => (
          < >
            <Links to={`/search?q=${encodeURIComponent(item)}`}><Text fontSize="small">{item}</Text></Links> 
            <Text fontSize="small">/</Text>  
          </>
        ))
      }
      
      <Text fontSize="small" color="brand">{label}</Text>
    </Flex>
  );
}



const Links = styled(Link)`
  text-decoration: none;
  `

