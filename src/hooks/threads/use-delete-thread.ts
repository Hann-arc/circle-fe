import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '@/libs/api';
import toast from 'react-hot-toast';

export function useDeleteThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['threads'],
    mutationFn: async (id: number) => {
      await Api.delete(`/threads/${id}`);
    },
    onSuccess: () => {
      toast.success('delete thread successful!!');
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error: any) => {
      console.error('Failed to delete thread:', error);
      toast.error(error?.response?.data?.message);
    },
  });
}
