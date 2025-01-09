import { AuthButton } from '@/components/AuthButton';
import InputField from '@/components/InputField';
import { PasswordInput } from '@/components/ui/password-input';
import ChakraRouterLink from '@/libs/ChakraRouterLink';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useRegisterForm } from '@/features/auth/hooks/use-register';

export const Register = () => {
  const { onSubmit, register, handleSubmit, errors } = useRegisterForm();
  return (
    <Box w="full" maxW="md" p={6}>
      <form
        onSubmit={
          handleSubmit(onSubmit)
        }
      >
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
          Sign-Up to{' '}
          <Text color="#FDBA74" as={'span'}>
            {' '}
            Circle
          </Text>
        </Text>
        <Stack gap={5}>
          <InputField
            type="text"
            placeholder="Username"
           {...register('userName')}
          />
          {errors.userName && (
            <Text color="red.500" fontSize="sm">
              {errors.userName.message}
            </Text>
          )}
          <InputField
            type="text"
            placeholder={'Fullname'}
          {...register('fullName')}
          />
          {errors.fullName && (
            <Text color="red.500" fontSize="sm">
              {errors.fullName.message}
            </Text>
          )}
          <InputField
            type="text"
            placeholder={'Email'}
            {...register('email')}
          />
           {errors.email && (
            <Text color="red.500" fontSize="sm">
              {errors.email.message}
            </Text>
          )}
          <PasswordInput
            borderRadius={'12px'}
            border="none"
            p={6}
            bg="#2D2D2D"
            color={'white'}
            placeholder={'Password'}
            {...register('password')}
          />
          {errors.password && (
            <Text color="red.500" fontSize="sm">
              {errors.password.message}
            </Text>
          )}
          <Text textAlign="right"></Text>
          <AuthButton type="submit">Sign-Up</AuthButton>
        </Stack>
        <Text fontSize="sm" textAlign="center" mt={4}>
          Already have account?{' '}
          <ChakraRouterLink to="/sign-in" color="#FDBA74 ">
            Sign-In
          </ChakraRouterLink>
        </Text>
      </form>
    </Box>
  );
};
