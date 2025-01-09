import { Login } from "@/features/auth/components/login";
import { Box } from "@chakra-ui/react";

export const LoginRoute = () => {

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      bg={"#1A1A1A"}
      color={"white"}
      justifyContent="center"
    >
      <Login />
    </Box>
  );
};
