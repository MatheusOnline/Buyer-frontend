
import {Button} from "../../../../shared/components/ui/Button/index.tsx";
import {Flex} from "../../../../shared/components/ui/Flex/index.tsx";
import { Line } from "../../../../shared/components/ui/Line/index.tsx";
import { Text } from "../../../../shared/components/ui/Text/index.tsx";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export const SocialAuth = () => {
  return (    
        <Flex flexDirection="column" gap="16px" >
            <Flex alignItems="center" fullWidth justifyContent="center" gap="8px" >
                <Line/>
                    <Text color="secondary" fontSize="small" >Ou </Text>
                <Line/>
            </Flex>   
            <Flex fullWidth  gap="4px" >
                <Button palette="neutral" variant="outlined" fullWidth> <FcGoogle size={28}/> </Button>
                <Button palette="neutral" variant="outlined" fullWidth> <FaApple size={28} color="black"/> </Button>
            </Flex>
        </Flex>
    )
}
