import { Api } from '@/libs/api';
import { Thread } from '@/types/threads';
import { useQuery } from '@tanstack/react-query';

export function useFindThreads() {
  return useQuery<Thread[]>({
    queryKey: ['threads'],
    queryFn: async () => {
      return (await Api.get('/threads')).data;
    },
  });
} 

export function useFindUniqueThread(id: number) {
  return useQuery<Thread>({
    queryKey: ['threads', id],
    queryFn: async () => {
      return (await Api.get(`/threads/${id}`)).data;
    },
  });
}

export function useFindthreadMe(userId: number | undefined){
  return useQuery<Thread[]>({
    queryKey: ['threads', userId],
    queryFn: async () => { 
      return (await Api.get('/threads/me')).data
    },
  })
}