import { User } from '@/features/auth/types/user';
import { Api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

export function useSuggestedUser() {
  return useQuery<User[]>({
    queryKey: ['user'],
    queryFn: async () => {
      return (await Api.get('/users/suggest')).data;
    },
  });
}

export function useSearchUsers(query: string) {
  return useQuery<User[]>({
    queryKey: ['user', query],
    queryFn: async () => {
      return (await Api.get('/users/search', { params: { name: query } })).data;
    },
  });
}