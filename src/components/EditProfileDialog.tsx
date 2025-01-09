'use client';
import { avatar, Close, Cover } from '@/assets/index';
import { Avatar } from '@/components/ui/avatar';
import { DialogBody, DialogHeader } from '@/components/ui/dialog';
import { useDialogStore } from '@/store/dialogStore';
import { Field } from '@/components/ui/field';
import { Box, Image, Input, Text, Textarea } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { useUpdateProfile } from '@/hooks/use-update-profile';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiCamera } from 'react-icons/hi';
import { useGetMe } from '@/features/auth/hooks/use-find-me';

export const EditProfileDialogComponent = () => {
  const { closeDialog } = useDialogStore();
  const { User } = useGetMe();

  const { register, handleSubmit, onSubmit, isLoading, setValue } =
    useUpdateProfile();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCover, setSelectedCover] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: avatarFileRef, ...registerAvatarFile } = register('avatar');
  const setAvatarInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      avatarInputRef.current = element;
      avatarFileRef(element);
    },
    [avatarFileRef]
  );

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: coverFileRef, ...registerCoverFile } = register('cover');
  const setCoverInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      coverInputRef.current = element;
      coverFileRef(element);
    },
    [coverFileRef]
  );

  const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('avatar', file);
    }
  };

  const handleCover = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCover(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('cover', file);
    }
  };

  useEffect(() => {
    if (User) {
      setValue('fullName', User.fullName || '');
      setValue('userName', User.userName || '');
      setValue('bio', User.Profile?.bio || '');
      setValue('avatar', User.Profile?.avatar || '');
      setValue('cover', User.Profile?.cover || '');
      setSelectedImage(User.Profile?.avatar || null);
      setSelectedCover(User.Profile?.cover || null);
    }
  }, [User, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader display={'flex'} justifyContent={'space-between'}>
          <Text as={'h1'} color={'white'} fontSize={'xl'}>
            Edit Profile
          </Text>
          <Image cursor="pointer" onClick={closeDialog} src={Close} />
        </DialogHeader>
        <DialogBody pb="4">
          {/* Cover Section */}
          <Box display={'flex'} flexDir={'column'}>
            <Box display={'flex'}>
              <Input
                type="file"
                hidden
                ref={setCoverInputRef}
                {...registerCoverFile}
                onChange={handleCover}
              />
              <Image
                src={selectedCover || User?.Profile?.cover || Cover}
                borderRadius="15px"
                height="110px"
                width="610.5px"
                onClick={() => coverInputRef.current?.click()}
                cursor="pointer"
              />
            </Box>
            <Box
              position="absolute"
              top="29.9%"
              left="92%"
              transform="translate(-50%, -50%)"
              bg="rgba(0, 0, 0, 0.5)"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p="5px"
              cursor="pointer"
              onClick={() => coverInputRef.current?.click()}
            >
              <HiCamera size={'15px'} color="white" />
            </Box>
          </Box>

          {/* Avatar Section */}
          <Box display="flex" justifyContent="space-between">
            <Input
              type="file"
              hidden
              ref={setAvatarInputRef}
              {...registerAvatarFile}
              onChange={handleAvatar}
            />
            <Box display="flex" position="relative">
              <Avatar
                borderRadius="full"
                border="4px solid #3F3F3F"
                boxSize="90px"
                src={selectedImage || User?.Profile?.avatar || avatar}
                marginTop="-50px"
                marginLeft="20px"
              />
              <Box
                position="absolute"
                top="70%"
                left="80%"
                transform="translate(-50%, -50%)"
                bg="rgba(0, 0, 0, 0.5)"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="5px"
                cursor="pointer"
                onClick={() => avatarInputRef.current?.click()}
              >
                <HiCamera size={'15px'} color="white" />
              </Box>
            </Box>
          </Box>

          {/* Full Name Field */}
          <Field marginTop={'10px'} color={'white'} label="Full Name :">
            <Input
              borderRadius={'12px'}
              placeholder="Full Name"
              border={'1px solid #545454'}
              {...register('fullName')}
            />
          </Field>

          {/* User Name Field */}
          <Field marginTop={'10px'} color={'white'} label="User Name :">
            <Input
              borderRadius={'12px'}
              placeholder="User Name"
              border={'1px solid #545454'}
              {...register('userName')}
            />
          </Field>

          {/* Bio Field */}
          <Field label="Bio :" marginTop={'10px'} color={'white'}>
            <Textarea
              borderRadius={'12px'}
              placeholder="Bio"
              border={'1px solid #545454'}
              variant="outline"
              {...register('bio')}
            />
          </Field>
        </DialogBody>
        <Box display="flex" justifyContent="flex-end" m="20px">
          <Button
            type="submit"
            backgroundColor="green"
            px="19px"
            _hover={{ backgroundColor: '#005E0E' }}
            borderRadius="15px"
            loading={isLoading}
            disabled={isLoading}
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};
