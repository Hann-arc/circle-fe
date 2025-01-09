import { Register } from "@/features/auth/components/register";
import { Box } from "@chakra-ui/react";

export const RegisterRoute = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={"#1A1A1A"}
      color={"white"}
    >
      <Register />
    </Box>
  );
};
