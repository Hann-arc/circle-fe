import { Api } from '@/libs/api';
import { createReply, createReplySchema } from '@/utils/create-reply';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useCreateReply = (threadId: number) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<createReply>({
    mode: 'all',
    resolver: zodResolver(createReplySchema),
  });

  const { mutateAsync } = useMutation<boolean, Error, createReply>({
    mutationKey: ['replies', threadId],
    mutationFn: async (data) => {
      const fromData = new FormData();
      fromData.append('content', data.content);
      if (data.media) fromData.append('media', data.media);
      return await Api.post(`/reply/${threadId}`, fromData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', threadId] });
      reset();
    },
  });

  const onSubmit = async (data: createReply) => {
    setIsLoading(true);
    try {
      console.log('Submitted Reply Data:', data);
      if (data.media) {
        console.log('Selected media file:', data.media[0]);
      }
      await mutateAsync(data);
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error('Error during reply submission');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    onSubmit,
    isLoading,
  };
};
