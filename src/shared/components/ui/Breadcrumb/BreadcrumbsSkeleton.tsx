import { Flex } from '../Flex/index.tsx';
import { Skeleton } from '../Skeleton/index.tsx';


export const BreadcrumbsSkeleton = () => {



  return (
    <Flex gap="8px" alignItems="center" >
      <Skeleton width="250px" height="20px" />
    </Flex>
  );
}





