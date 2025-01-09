import { AuthButton } from "@/components/AuthButton";
import ChakraRouterLink from '@/libs/ChakraRouterLink';
import InputField from '@/components/InputField';
import { Box, Heading, Stack, Text } from "@chakra-ui/react";


export const ForgotPassword = () => {
  return (
    <Box w="full" maxW="md" p={6}>
      <Heading as="h1" size="3xl" color="#FDBA74" mb={2} textAlign="center">
        Circle
      </Heading>
      <Text
        fontSize="xl"
        mt={8}
        fontWeight="semibold"
        mb={6}
        textAlign="center"
      >
        Forgot password{" "}
        <Text color="#FDBA74" as={"span"}>
        Circle
        </Text>
      </Text>
      <Stack gap={10}>
        <InputField type="email" placeholder={"Email"} />
        <AuthButton  type="submit">Send Instruction</AuthButton>
      </Stack>
      <Text fontSize="sm" textAlign="center" mt={4}>
        Already have account?{" "}
        <ChakraRouterLink to="/sign-in" color="#FDBA74 ">
          Sign-In
        </ChakraRouterLink>
      </Text>
    </Box>
  );
};
