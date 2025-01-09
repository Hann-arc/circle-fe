import { InputImage } from '@/assets';
import { Box, Image, Input } from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/features/auth/store/auth';
import { useCallback, useRef, useState } from 'react';
import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useCreateReply } from '@/hooks/threads/reply';
import { useParams } from 'react-router';
import { useFindUniqueThread } from '@/service/thread';

export function Reply() {
  const { User } = useGetMe();
  const { id } = useParams();
  const { data: threads } = useFindUniqueThread(Number(id));

  const threadId = threads?.id;

  const { register, handleSubmit, onSubmit, isLoading, setValue } =
  useCreateReply(threadId ?? 0);

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { ref: fileRef, ...registerFile } = register('media');
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
      setValue('media', file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <Box display={'flex'} justifyContent={'space-between'} w={'100%'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display={'flex'}>
          <Avatar
            marginLeft={'20px'}
            boxSize={'40px'}
            src={User?.Profile?.avatar}
          />

          <Input
            placeholder="Type your reply!"
            {...register('content')}
            border={'none'}
            _placeholder={{
              color: '#B2B2B2',
              fontSize: '17px',
              fontWeight: 'Bold',
            }}
          />
          {selectedImage && (
            <Box
              position="relative"
              display={'flex'}
              justifyContent={'flex-start'}
              marginX="auto"
              width="90%"
              mt="4"
            >
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
        </Box>

        <Box display={'flex'} alignItems={'center'} w={'30%'} gap={'20px'}>
          <Input type="file" hidden ref={setInputRef} {...registerFile} onChange={handleFileChange} />
          <Image
            w={'20%'}
            cursor={'pointer'}
            onClick={handleOpenFile}
            h={'90%'}
            src={InputImage}
          />
          <Button
          onClick={removeImage}
            backgroundColor={'#005E0E'}
            px="19px"
            _hover={{ backgroundColor: '#005E0E' }}
            borderRadius={'15px'}
            loading={isLoading}
            type="submit"
          >
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
}
