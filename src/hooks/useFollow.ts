import { Api } from '@/libs/api';
import { toggleFollow } from '@/utils/toggle-folllow';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<any, Error, toggleFollow>({
    mutationKey: ['follow'],
    mutationFn: async (variables) => {
      return (await Api.post('/follows/toggle', { followingId: variables.followingId })).data;
    },
    onSuccess: (data, variables) => {
      const { followingId } = variables;
      queryClient.setQueryData(['followers', followingId], (oldData: Array<{ id: number }> | undefined) => {
        if (!oldData) return;

        if (data.message === 'berhasil follow') {
          return [...oldData, { id: followingId }];
        }

        if (data.message === 'berhasil unfollow') {
          return oldData.filter((follower) => follower.id !== followingId);
        }
      });
      queryClient.invalidateQueries({queryKey: ['user']});
      queryClient.invalidateQueries({queryKey: ['auth']});
    },
  });

  return { mutateAsync };
};
