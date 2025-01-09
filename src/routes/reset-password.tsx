import { ResetPassword } from "../features/auth/components/resetPassword";
import { Box } from "@chakra-ui/react";

export const ResetPasswordRoute = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={"#1A1A1A"}
      color={"white"}
    >
      <ResetPassword />
    </Box>
  );
};
