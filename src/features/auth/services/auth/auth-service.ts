import { Api } from '@/libs/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from '../../types/user';
import { LoginForm } from '../../utils/login';
import { RegisterForm } from '../../utils/register';

export function useLogin() {
  return useMutation<{ token: string },Error, LoginForm>({
    mutationKey: ['auth'],
    mutationFn: async (data) => {
      return (await Api.post('/login', data)).data
    },
  });
}

export function useRegister() {
  return useMutation<RegisterForm, Error, RegisterForm>({
    mutationKey: ['auth'],
    mutationFn: async (data) => {
      return (await Api.post('/register', data)).data;
    },
  });
}

export function useFindMe() {
  return useQuery<User>({
    queryKey: ['auth'],
    queryFn: async () => {
        const response = await Api.get("/me");
        return response.data; 
    },
  });
}
