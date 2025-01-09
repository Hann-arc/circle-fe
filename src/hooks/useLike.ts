import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLikeStore } from '@/store/likesStore';
import { Api } from '@/libs/api';

interface LikeData {
  liked: boolean;
}

export const useToggleLike = () => {
  const { setLocalLike } = useLikeStore();
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number, { previousLiked: boolean }>({
    mutationKey: ['like'],
    mutationFn: async (threadId: number) => {
      await Api.post(`/like/${threadId}`);
    },
    onMutate: (threadId: number) => {
      const previousLiked =
        useLikeStore.getState().localLikes[threadId] ?? false;

      setLocalLike(threadId, (prev) => !prev);

      return { previousLiked };
    },
    onError: (err, threadId, context) => {
      if (context) {
        setLocalLike(threadId, context.previousLiked);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like'] });
      queryClient.invalidateQueries({ queryKey: ['threads'] });
      queryClient.setQueryData<LikeData>(['like'], (oldData) => {
        if (oldData && typeof oldData === 'object') {
          return {
            ...oldData,
            liked: true,
          };
        } else {
          return { liked: true };
        }
      });
    },
  });
};
