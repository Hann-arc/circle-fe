import { ForgotPassword } from "@/features/auth/components/forgotPassword";
import { Box } from "@chakra-ui/react";

export const ForgotPasswordRoute = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={"#1A1A1A"}
      color={"white"}
    >
      <ForgotPassword />
    </Box>
  );
};
