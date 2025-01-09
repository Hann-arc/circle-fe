import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoginForm, loginFormSchema } from '@/features/auth/utils/login';
import { useLogin } from '@/features/auth/services/auth/auth-service';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';

export const useLoginForm = () => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'all',
    resolver: zodResolver(loginFormSchema),
  });

  const {mutateAsync} = useLogin();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      try {
        const { token } = await mutateAsync(data);
        Cookies.set("token", token);
        toast.success("Login successful!");
  
        navigate('/');
        queryClient.invalidateQueries({queryKey: ['threads']});
      } catch (error : any) {
        console.error("Error during login:", error);
        toast.error(error?.response?.data?.message);
      }
      
    },
    [mutateAsync, navigate],
  );
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};

// export const useLoginForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginForm>({
//     mode: 'all',
//     resolver: zodResolver(loginFormSchema),
//   });

//   const signin = useAuthStore((state) => state.signin);

//   const onSubmit = useCallback(
//     async (data: LoginForm) => {
//       try {
//         await signin(data); 
        
//       } catch (error) {
//         console.error("Error during login:", error);
//         const errorMessage =
//           (error as any)?.response?.data?.message || "An error occurred during login.";
//         toast.error(errorMessage);
//       }
//     },
//     [signin] 
//   );

//   return {
//     onSubmit,
//     register,
//     handleSubmit,
//     errors,
//   };
// };
