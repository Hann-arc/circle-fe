import { Box, Image, Text } from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import { Heart, Comment } from '@/assets';
import { useFindUniqueThread } from '@/service/thread';
import { useParams } from 'react-router';
import { LoadingSpiner } from './LoadingSpiner';
import { useFindReplies } from '@/service/replies';
import dayjs from 'dayjs';

export function Replies() {
  const { id } = useParams();
  const { data: threads } = useFindUniqueThread(Number(id));

  const threadId = threads?.id;
  const { data: replies, isLoading } = useFindReplies(threadId ?? 0);
  if (isLoading) {
    <LoadingSpiner />;
    console.log('Loading data...');
  } else {
    console.log('data: ', threads);
    console.log('author:', threads?.author?.fullName);
  }
  return (
    <>
      {replies && replies.length > 0 ? (
        replies?.map((reply) => (
          <Box
            backgroundColor={'#1A1A1A'}
            paddingBottom={'18px'}
            borderBottom={"1px solid"}
            borderColor={'#3F3F3F'}
          >
            <Box
              display={'flex'}
              marginTop={'15px'}
              backgroundColor={'#1A1A1A'}
              paddingBottom={'18px'}
            >
              <Avatar marginLeft={'22px'} src={reply.author.Profile.avatar} boxSize="40px" />
              <Box
                paddingRight={'20px'}
                marginLeft={'20px'}
                gap={'10px'}
                display={'flex'}
                flexDirection={'column'}
              >
                <Box gap={'5px'}  display={'flex'} >
                  <Text fontWeight={'bold'} fontSize={'14px'}>
                    {reply.author.fullName}
                  </Text>
                  <Text color={'#909090'} fontSize={'14px'}>
                    @{reply.author.userName}
                  </Text>
                  <Text color={'#909090'} fontSize={'14px'}>
                    •
                  </Text>
                  <Text color={'#909090'} fontSize={'14px'}>
                    {dayjs(reply.createdAt).fromNow()}
                  </Text>
                </Box>
                <Box flexDirection={"column"} gap={"5px"} display={'flex'}>
                  <Text fontSize={'14px'} paddingRight={'20px'}>
                    {reply.content}
                  </Text>
                  {reply.media && (
                  <Image
                    src={reply.media}
                    alt=""
                    borderRadius="8px"
                    objectFit="cover"
                    maxHeight="400px"
                    marginBottom="5px"
                  />
                )}
                </Box>
                <Box
                  marginTop={'5px'}
                  marginLeft={'-5px'}
                  fontSize={'14px'}
                  display={'flex'}
                >
                  <Image src={Heart} w={'27px'} />
                  <Text marginLeft={'6px'} color={'#909090'}>
                    0
                  </Text>
                  <Image marginLeft={'25px'} w={'24px'} src={Comment} />
                  <Text marginLeft={'6px'} color={'#909090'}>
                    0 Replies
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box
        backgroundColor={'#1A1A1A'}
        paddingBottom={'18px'}
        border={"none"}
      >
        <Box
          display={'flex'}
          marginTop={'15px'}
         justifyContent={"center"}
        >
          <Text>Be the first to comment!</Text>
        </Box>
      </Box>
      )}
    </>
  );
}
