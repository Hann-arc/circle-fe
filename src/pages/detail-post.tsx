import { Comment, Heart, LeftArrow, Like } from '@/assets';
import { LoadingSpiner } from '@/components/LoadingSpiner';
import { Replies } from '@/components/Replies';
import { Reply } from '@/components/Reply';
import { Avatar } from '@/components/ui/avatar';
import { useToggleLike } from '@/hooks/useLike';
import { useFindUniqueThread } from '@/service/thread';
import { useLikeStore } from '@/store/likesStore';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useParams } from 'react-router';

export const DetailPost = () => {
  const { id } = useParams();
  const { data: threads, isLoading } = useFindUniqueThread(Number(id));
  const handleBack = () => {
    window.history.back();
  };
  if (isLoading) {
    <LoadingSpiner />;
    console.log('Loading data...');
  } else {
    console.log('data: ', threads);
    console.log('author:', threads?.author?.fullName);
  }

  const { localLikes } = useLikeStore();
  const { mutate: toggleLike } = useToggleLike();

  const isLiked = threads ? localLikes[threads.id] ?? false : false;

  return (
    <Box backgroundColor={'#1A1A1A'} display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        borderBottom="1px solid #3F3F3F"
      >
        <Text
          marginLeft="22px"
          marginTop="20px"
          fontSize="17px"
          fontWeight="bold"
        >
          <Box
            position="sticky"
            top="0"
            zIndex="10"
            bg={'#1A1A1A'}
            display="flex"
            alignItems={'center'}
          >
            <Button
              backgroundColor={'transparent'}
              _hover={{ backgroundColor: 'transparent' }}
            >
              <Image src={LeftArrow} cursor={'pointer'} onClick={handleBack} />
            </Button>
            <Text> Status</Text>
          </Box>
        </Text>
        <Box
          display={'flex'}
          marginTop={'25px'}
          flexDirection={'column'}
          marginBottom={'10px'}
        >
          <Box
            display={'flex'}
            marginBottom={'10px'}
            justifyContent={'space-between'}
          >
            <Box display={'flex'}>
              <Avatar
                marginLeft={'22px'}
                borderRadius="full"
                boxSize="40px"
                src={threads?.author.Profile?.avatar}
              />
              <Box
                marginLeft={'16px'}
                marginTop={'-2px'}
                display={'flex'}
                flexDirection={'column'}
              >
                <Text fontSize={'15px'} fontWeight={'bold'}>
                  {threads?.author?.fullName}
                </Text>
                <Text fontSize={'15px'} color={'#909090'}>
                  @{threads?.author?.userName}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Text marginLeft="25px" marginTop={'5px'}>
          {threads?.content}
        </Text>
        {threads?.media && (
          <Box marginTop="20px">
            <Image
              src={threads?.media}
              alt=""
              maxWidth="400px"
              height="auto"
              objectFit="contain"
              borderRadius="8px"
              marginX="auto"
            />
          </Box>
        )}
        <Box marginLeft="25px" marginTop={'20px'} gap={'5px'} display={'flex'}>
          <Text color={'#909090'} fontSize={'14px'}>
            {dayjs(threads?.createdAt).format("hh:mm A")}
          </Text>
          <Text color={'#909090'} fontSize={'14px'}>
            •
          </Text>
          <Text color={'#909090'} fontSize={'14px'}>
          {dayjs(threads?.createdAt).format("MMM DD")}
          </Text>
          <Text color={'#909090'} fontSize={'14px'}>
          {dayjs(threads?.createdAt).format("YYYY")}
          </Text>
        </Box>
        <Box
          marginLeft="25px"
          marginTop={'15px'}
          marginBottom={'15px'}
          fontSize={'14px'}
          display={'flex'}
        >
          {isLiked ? (
                 <Image
                 src={Like}
                 cursor={"pointer"}
                 w={'27px'}
                 onClick={(e) => {
                   e.stopPropagation(); 
                   if (threads?.id !== undefined) {
                     toggleLike(threads.id);
                   }
                 }}
               />
                ) : (
                  <Image
                  src={Heart}
                  cursor={"pointer"}
                  w={'27px'}
                  onClick={(e) => {
                    e.stopPropagation(); if (threads?.id !== undefined) {
                      toggleLike(threads.id);
                    }
                  }}
                />
                )}

          <Text marginLeft={'6px'} color={'#909090'}>
            {threads?._count.likes}
          </Text>
          <Image marginLeft={'25px'} w={'24px'} src={Comment} />
          <Text marginLeft={'6px'} color={'#909090'}>
            {threads?.replies.length} Replies
          </Text>
        </Box>
      </Box>
      <Box
        display={'flex'}
        paddingBottom={'15px'}
        borderBottom={'1px solid #3F3F3F'}
        paddingTop={'15px'}
      >
        <Reply />
      </Box>
      <Box borderBottom={'1px solid #3F3F3F'}>
        <Box marginTop={'15px'} flexDirection={'column'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Replies />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
