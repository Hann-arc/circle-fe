'use client';
import { InputImage } from '@/assets/index';
import { ListPost } from '@/components/ListPosts';
import { ThreadDialogComponent } from '@/components/ThreadDialog';
import { Avatar } from '@/components/ui/avatar';
import { DialogContent, DialogRoot } from '@/components/ui/dialog';
import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useCreatedThread } from '@/hooks/threads/use-create-thread';

import {
  Box,
  Button,
  DialogTrigger,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';

export const Home = () => {
  const { User } = useGetMe();
  console.log('User: ', User);

  const { openDialog, isOpen } = useCreatedThread();
  

  return (
    <Box borderColor={'#3F3F3F'} bgColor={'#1A1A1A'}>
      <DialogRoot lazyMount open={isOpen}>
        <Box
          position="sticky"
          top="0"
          zIndex="10"
          bg={'#1A1A1A'}
          padding="10px"
        >
          <Text
            as="h1"
            marginTop="30px"
            marginLeft={'20px'}
            fontSize={'xl'}
            fontWeight={'bold'}
          >
            Home
          </Text>
        </Box>
        <Box marginTop={'30px'} flexDirection={'column'}>
          <Box
            display={'flex'}
            borderBottom={'2px'}
            paddingBottom={'15px'}
            borderBottomWidth="1px"
            borderBottomStyle="solid"
            borderColor={'#3F3F3F'}
          >
            <Box display={'flex'} w={'70%'}>
              <Avatar
                marginLeft={'20px'}
                boxSize={'40px'}
                src={User?.Profile?.avatar || 'default.jpg'}
              />
              <DialogTrigger asChild>
                <Input
                  onClick={openDialog}
                  type="text"
                  readOnly
                  placeholder="What happening today?"
                  border={'none'}
                  _placeholder={{
                    color: '#B2B2B2',
                    fontSize: '17px',
                    fontWeight: 'Bold',
                  }}
                />
              </DialogTrigger>
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              marginLeft={'70px'}
              w={'30%'}
              gap={'20px'}
            >
              {/* <Input type="file" hidden ref={setInputRef} {...registerFile} /> */}
              <Image
                onClick={openDialog}
                w={'20o%'}
                h={'90%'}
                src={InputImage}
                cursor={'pointer'}
              />

              <Button
                backgroundColor={'#005E0E'}
                px="19px"
                _hover={{ backgroundColor: '#005E0E' }}
                borderRadius={'15px'}
              >
                Post
              </Button>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginTop={'15px'}>
            <ListPost />
          </Box>
        </Box>
        <DialogContent backgroundColor={'#1D1D1D'}>
          <ThreadDialogComponent />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};
