import { AuthButton } from '@/components/AuthButton';
import InputField from '@/components/InputField';
import { PasswordInput } from '@/components/ui/password-input';
import { useLoginForm } from '@/features/auth/hooks/use-login';
import ChakraRouterLink from '@/libs/ChakraRouterLink';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

export const Login = () => {
  
  const { onSubmit, register, handleSubmit, errors } = useLoginForm();

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
        Sign-In to{' '}
        <Text color="#FDBA74" as={'span'}>
          Circle
        </Text>
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={5}>
          <InputField
            type="email"
            {...register('email')}
            placeholder={'Email'}
          />
          {errors.email && (
            <Text color="red.500" fontSize="sm">
              {errors.email.message}
            </Text>
          )}
          <PasswordInput
            bg="#2D2D2D"
            border="none"
            p={6}
            color={'white'}
            {...register('password')}
            borderRadius={'12px'}
            placeholder={'Password'}
          />
          {errors.password && (
            <Text color="red.500" fontSize="sm">
              {errors.password.message}
            </Text>
          )}
          <Text textAlign="right">
            <ChakraRouterLink to="/forgot-password" color="#FFB065">
              Forgot password?
            </ChakraRouterLink>
          </Text>
          <AuthButton type="submit">Sign-In</AuthButton>
        </Stack>
      </form>
      <Text fontSize="sm" textAlign="center" mt={4}>
        Don't have an account yet?{' '}
        <ChakraRouterLink to="/sign-up" color="#FDBA74 ">
          Create account
        </ChakraRouterLink>
      </Text>
    </Box>
  );
};
