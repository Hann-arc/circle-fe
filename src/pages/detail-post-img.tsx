import { Box, Image, Text } from '@chakra-ui/react';
import { Avatar } from '../components/ui/avatar';
import {
  Heart,
  Comment,
  ArrowRightCircle,
  ArrowLeftCircle,
} from '@/assets';
import { Reply } from '@/components/Reply';
import { Replies } from '@/components/Replies';
import { CloseButton } from '@/components/ui/close-button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFindUniqueThread } from '@/service/thread';
import { LoadingSpiner } from '@/components/LoadingSpiner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const DetailPostImg = () => {
  const { id } = useParams();
  const { data: threads, isLoading } = useFindUniqueThread(Number(id));
  const navigate = useNavigate();

  dayjs.extend(relativeTime);
  const [isShowDetail, setisShowDetail] = useState(true);
  const handleClose = () => {
    window.history.back();
  };

  const handleDetailProfileUser = (query: string) => {
    navigate(`/${query}`);
  };

  if (isLoading) {
    <LoadingSpiner />;
    console.log('Loading data...');
  } else {
    console.log('data: ', threads);
    console.log('author:', threads?.author?.fullName);
  }

  return (
    <Box display={'flex'} w={'100%'}>
      <Box
        display="flex"
        backgroundColor="#1A1A1A"
        justifyContent="center"
        w={isShowDetail ? '70%' : '100%'}
        position="relative"
        h={'100vh'}
      >
        <Box
          position="absolute"
          top="10px"
          left="50px"
          display="flex"
          gap="900px"
        >
          <CloseButton
            color="white"
            backgroundColor={'black'}
            borderRadius={'50px'}
            size={'sm'}
            _hover={{ backgroundColor: 'black' }}
            onClick={handleClose}
          />
          {isShowDetail ? (
            <Image
              cursor={'pointer'}
              src={ArrowRightCircle}
              w={'32px'}
              onClick={() => setisShowDetail(!isShowDetail)}
            />
          ) : (
            <Image
              cursor={'pointer'}
              marginLeft={'300px'}
              src={ArrowLeftCircle}
              w={'32px'}
              onClick={() => setisShowDetail(!isShowDetail)}
            />
          )}
        </Box>
        <Box w="96%" display="flex" justifyContent="center">
          <Image src={threads?.media} />
        </Box>
      </Box>
      {isShowDetail && (
        <Box
          backgroundColor={'#1A1A1A'}
          paddingBottom={'18px'}
          borderBottom={'1px solid'}
          borderLeft={'1px solid'}
          borderColor={'#3F3F3F'}
          display={'flex'}
          flexDirection={'column'}
          paddingTop={'20px'}
          w={'30%'}
          color={'white'}
          gap={'10px'}
          height={'100vh'}
          overflowY="scroll"
        >
          <Box
            display={'flex'}
            marginTop={'15px'}
            borderBottom={'1px solid'}
            borderColor={'#3F3F3F'}
            paddingBottom={'18px'}
          >
            <Avatar
              marginLeft={'22px'}
              src={threads?.author.Profile?.avatar}
              boxSize="40px"
              onClick={(e) => {
                e.stopPropagation()
                handleDetailProfileUser(threads?.author.userName as string);
              }}
              cursor={'pointer'}
            />
            <Box
              paddingRight={'20px'}
              marginLeft={'20px'}
              gap={'10px'}
              display={'flex'}
              flexDirection={'column'}
            >
              <Box gap={'5px'} display={'flex'}>
                <Text
                  fontWeight={'bold'}
                  fontSize={'14px'}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDetailProfileUser(threads?.author.userName as string);
                  }}
                  cursor={'pointer'}
                >
                  {threads?.author.fullName}
                </Text>
                <Text
                  color={'#909090'}
                  fontSize={'14px'}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDetailProfileUser(threads?.author.userName as string);
                  }}
                  cursor={'pointer'}
                >
                  @{threads?.author.userName}
                </Text>
                <Text color={'#909090'} fontSize={'14px'}>
                  •
                </Text>
                <Text color={'#909090'} fontSize={'14px'}>
                  {dayjs(threads?.createdAt).fromNow()}
                </Text>
              </Box>
              <Box flexDirection={'column'} gap={'5px'} display={'flex'}>
                <Text fontSize={'14px'} paddingRight={'20px'}>
                  {threads?.content}
                </Text>
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
                  {threads?._count.replies} Replies
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            borderBottom={'1px solid'}
            borderColor={'#3F3F3F'}
            display={'flex'}
            paddingBottom={'10px'}
          >
            <Reply />
          </Box>
          <Box>
            <Replies />
          </Box>
        </Box>
      )}
    </Box>
  );
};

{
  /* <Box display={'flex'} w={"100%"} flexDirection={'column'}>
<Box display={'flex'} h={"5vh"}>
  {' '}
  <CloseButton
    variant="ghost"
    display={'flex'}
    justifyContent={'flex-start'}
    color={'white'}
    _hover={{ backgroundColor: 'transparent' }}
  />
  <CloseButton
    variant="ghost"
    display={'flex'}
    justifyContent={'flex-start'}
    color={'white'}
    _hover={{ backgroundColor: 'transparent' }}
  />
</Box>
<Box w={'100%'} justifyContent={"center"} alignItems={"center"} h={"90vh"} backgroundColor={"red"}>
  <Image src={avatar} 
  w={"80%"} h={"100%"} objectFit={"cover"}/>
</Box>
</Box> */
}
