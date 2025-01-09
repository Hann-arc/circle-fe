import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LoginButtonProps extends ButtonProps {
  children: ReactNode;
}

export const AuthButton: React.FC<LoginButtonProps> = ({
    type,
  children,
  ...props

}) => {
  return (
    <>
      <Button borderRadius="12px" type={type} 
       backgroundColor="#FDBA74"
       py={6}
       fontWeight="bold"
       width="full"
       _hover={{ backgroundColor: "#FB9E57" }}
       _active={{ backgroundColor: "#F97316" }} 
      {...props}>
        {children}
      </Button>
    </>
  );
};
