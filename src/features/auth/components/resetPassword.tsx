import { AuthButton } from "@/components/AuthButton";
import { PasswordInput } from "@/components/ui/password-input";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

export const ResetPassword = () => {
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
        Reset Password{" "}
        <Text color="#FDBA74" as={"span"}>
          {" "}
          Circle
        </Text>
      </Text>
      <Stack gap={5}>
      <PasswordInput   bg="#2D2D2D" color={"white"} borderRadius={"12px"} placeholder={"New Password"}/>
      <PasswordInput   bg="#2D2D2D" color={"white"} borderRadius={"12px"} placeholder={"Confirm New Password"}/>
        
        <Text textAlign="right"></Text>
        <AuthButton type="submit">Create New Password</AuthButton>
      </Stack>
    </Box>
  );
};
