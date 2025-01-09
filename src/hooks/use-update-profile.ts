import { useFindMe } from '@/features/auth/services/auth/auth-service';
import { Api } from '@/libs/api';
import { useDialogStore } from '@/store/dialogStore';
import { UpdatePRofile, updateUserProfileSchema } from '@/utils/update-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useUpdateProfile = () => {
  const { isOpen, openDialog, closeDialog } = useDialogStore();
  const { data: User } = useFindMe();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdatePRofile>({
    mode: 'all',
    resolver: zodResolver(updateUserProfileSchema),
  });

  const { mutateAsync } = useMutation<boolean, Error, UpdatePRofile>({
    mutationKey: ['updateUser'],
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append('userName', data.userName || '');
      formData.append('fullName', data.fullName || '');
      formData.append('bio', data.bio || '');
      if (data.avatar) {
        formData.append('avatar', data.avatar || '');
      }
      if (data.cover) {
        formData.append('cover', data.cover);
      }
      return await  Api.patch(`/users`, formData)
    },
   
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        queryClient.invalidateQueries({ queryKey: ['threads'] });
        closeDialog()
      },
  });

  const onSubmit = async (data: UpdatePRofile) => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...data,
        userName: data.userName || User?.userName,
        fullName: data.fullName || User?.fullName,
        bio: data.bio || User?.Profile?.bio,
        avatar: data.avatar || User?.Profile?.avatar,
        cover: data.cover || User?.Profile?.cover,
      };
      
      // toast.success('Data yang dikirim: ' + JSON.stringify(updatedData), {
      //   duration: 6000,
      // });

      console.log('Data yang dikirim:', updatedData);
      await mutateAsync(updatedData);
      toast.success('Profile updated succesfully')
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
    onSubmit,
    isOpen,
    openDialog,
    isLoading,
    errors,
    setValue
  };
};
