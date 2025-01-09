'use client';
import { avatar, Close, InputImage } from '@/assets/index';
import { Avatar } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import { DialogBody, DialogHeader } from '@/components/ui/dialog';
import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useCreatedThread } from '@/hooks/threads/use-create-thread';
import { useDialogStore } from '@/store/dialogStore';
import { Box, Image, Input, Stack } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';

  export const ThreadDialogComponent = () => {
  const { User } = useGetMe();
  const { register, handleSubmit, onSubmit, isLoading, setValue } = useCreatedThread();

  const { closeDialog } = useDialogStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
 
  const { ref: fileRef, ...registerFile } = register("media");

  const setInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      inputFileRef.current = element;
      fileRef(element);
    },
    [fileRef]
  );
  const handleOpenFile = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); 
      };
      reader.readAsDataURL(file);
      setValue('media', file)
    }
  };

  const removeImage = () => {
    setSelectedImage(null); 
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader display={'flex'} justifyContent={'flex-end'}>
          <Image cursor="pointer" onClick={closeDialog} src={Close} />
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Box
              display={'flex'}
              borderBottom={'2px'}
              paddingBottom={'15px'}
              borderBottomWidth="1px"
              borderBottomStyle="solid"
              borderColor={'#3F3F3F'}
            >
              <Box display={'flex'} w={'100%'}>
                <Avatar
                  boxSize={'40px'}
                  src={User?.Profile?.avatar || avatar}
                />
                <Input
                  {...register('content')}
                  type="text"
                  color={'white'}
                  placeholder="What happening today?"
                  border={'none'}
                  _placeholder={{
                    color: '#B2B2B2',
                    fontSize: '17px',
                    fontWeight: 'Bold',
                  }}
                />
              </Box>
            </Box>
             {selectedImage && (
              <Box position="relative" display={"flex"} justifyContent={"flex-start"} marginX="auto" width="90%" mt="4">
              <Button 
                  position="absolute" 
                  top="0" 
                  right="0" 
                  size="xs" 
                  onClick={removeImage} 
                  colorScheme="red"
                >
                  Remove
                </Button>
                <Image 
                  src={selectedImage} 
                  alt="Image preview" 
                  boxSize="70px" 
                  objectFit="cover" 
                  borderRadius="8px" 
                />
              </Box>
             )} 
          </Stack>
        </DialogBody>
        <Box display="flex" justifyContent="space-between" m="20px">
          <Input type="file" hidden ref={setInputRef}  {...registerFile} onChange={handleFileChange} />
          <Button backgroundColor={'#1D1D1D'}>
            <Image w="30px" onClick={handleOpenFile} src={InputImage} />
          </Button>
          <Button
            type="submit"
            backgroundColor="#005E0E"
            px="19px"
            _hover={{ backgroundColor: '#005E0E' }}
            borderRadius="15px"
            loading={isLoading}
          >
            Post
          </Button>
        </Box>
      </form>
    </>
  );
};
