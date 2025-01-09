import {
  Button,
  ButtonProps,
  Image,
  Text
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

interface ButtonSideProps extends ButtonProps {
  icon?: string;
  activeIcon?: string;
  label: string;
  path: string;
}

const ButtonSide: React.FC<ButtonSideProps> = ({
  icon,
  activeIcon,
  label,
  path,
  ...props
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
 

  return (
    <Button
      onClick={() => navigate(path)}
      height="57.6px"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      variant="ghost"
      gap="16px"
      _hover={{
        backgroundColor: "rgba(255,255,255, 0.1)",
      }}
      {...props}
    >
      <Image src={isActive ? activeIcon : icon} w="28.8px" />
      <Text color={"white"} 
       >
        {label}
      </Text>
    </Button>
  );
};

export default ButtonSide;
