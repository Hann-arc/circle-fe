import { useForm } from 'react-hook-form';
import { RegisterForm, registerFormSchema } from '@/features/auth/utils/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useRegister } from '@/features/auth/services/auth/auth-service';

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: 'all',
    resolver: zodResolver(registerFormSchema),
  });

  const {mutateAsync} = useRegister()
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: RegisterForm) => {
      try {
        await mutateAsync(data);
        toast.success("Registration successful!");
        navigate('/sign-in');
      } catch (error: any) {
        console.error("Error during register:", error);
        toast.error(error?.response?.data?.message);
      }
    },
    [mutateAsync, navigate]
  );

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
}



// export const useRegisterForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterForm>({
//     mode: 'all',
//     resolver: zodResolver(registerFormSchema),
//   });

//   const signup = useAuthStore((state) => state.signup);
//   const navigate = useNavigate();

//   const onSubmit = useCallback(
//     async (data: RegisterForm) => {
//       try {
//         await signup(data);
//         navigate('/sign-in');
//       } catch (error) {
//         console.error('Error during registration:', error);
//         const errorMessage =
//           (error as any)?.response?.data?.message ||
//           'An error occurred during registration.';
//         toast.error(errorMessage);
//       }
//     },
//     [signup, navigate]
//   );

//   return {
//     onSubmit,
//     register,
//     handleSubmit,
//     errors,
//   };
// };
