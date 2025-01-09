import { CreateThread, createThreadSchema } from '@/utils/create-thread';
import { Api } from '@/libs/api';
import { useDialogStore } from '@/store/dialogStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useCreatedThread = () => {
  const { isOpen, openDialog, closeDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<CreateThread>({
    mode: 'all',
    resolver: zodResolver(createThreadSchema),
  });

  const { mutateAsync } = useMutation<boolean, Error, CreateThread>({
    mutationKey: ['threads'],
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append('content', data.content);
      if (data.media) formData.append('media', data.media);
      return await Api.post('/threads', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
      closeDialog();
      reset();
    },
  });

  const onSubmit = async (data: CreateThread) => {
    setIsLoading(true);
    try {
      console.log('Submitted Data:', data);
      if (data.media) {
        console.log('Selected media file:', data.media[0]);
      }
      await mutateAsync(data);
    } catch (error: any) {
      console.error('Error during submission:', error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    register,
    handleSubmit,
    closeDialog,
    reset,
    setValue,
    onSubmit,
    isOpen,
    openDialog,
    isLoading,
  };
};
