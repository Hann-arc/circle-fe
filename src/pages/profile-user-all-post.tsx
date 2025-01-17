import { Comment, Heart } from '@/assets/index';
import { LoadingSpiner } from '@/components/LoadingSpiner';
import { Avatar } from '@/components/ui/avatar';
import { useGetDetailUser } from '@/service/user';
import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
export const UserProfileAllPost = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  dayjs.extend(relativeTime);

  const { data: user, isLoading } = useGetDetailUser(String(query));

  if (isLoading) {
    <LoadingSpiner />;
    console.log('Loading data...');
  } else {
    console.log('data: ', user);
  }

  const handleClick = (id: number) => {
    navigate(`/detail-post/${id}`);
  };
  const handleDetailImg = (id: number) => {
    navigate(`/detail/photo/${id}`);
  };

  return (
    <Box flexDirection={'column'} backgroundColor="#1A1A1A">
      <Box display={'flex'} flexDirection={'column'}>
        {user?.Thread &&
        Array.isArray(user.Thread) &&
        user.Thread.length > 0 ? (
          user.Thread.map((thread) => (
            <Box
              key={thread.id}
              paddingTop={'18px'}
              display={'flex'}
              borderBottom={'1px'}
              paddingBottom={'18px'}
              borderColor={'#3F3F3F'}
              onClick={() => handleClick(thread.id)}
              cursor={'pointer'}
              border={'1px solid #3F3F3F'}
            >
              <Avatar
                marginLeft={'22px'}
                src={user?.Profile?.avatar || ' '}
                boxSize="40px"
              />
              <Box
                paddingRight={'20px'}
                marginLeft={'20px'}
                gap={'10px'}
                display={'flex'}
                flexDirection={'column'}
              >
                <Box gap={'5px'} display={'flex'}>
                  <Text fontWeight={'bold'} fontSize={'14px'}>
                    {user?.fullName}
                  </Text>
                  <Text color={'#909090'} fontSize={'14px'}>
                    @{user?.userName}
                  </Text>
                  <Text color={'#909090'} fontSize={'14px'}>
                    •
                  </Text>
                  <Text color={'#909090'} fontSize={'14px'}>
                    {dayjs(thread.createdAt).fromNow()}
                  </Text>
                </Box>
                <Box flexDirection="column" display="flex">
                  <Text fontSize="14px" marginBottom="7px" paddingRight="20px">
                    {thread.content}
                  </Text>
                  {thread.media && (
                    <Image
                      src={thread.media}
                      w={"80%"}
                      alt=""
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDetailImg(thread.id);
                      }}
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
          ))
        ) : (
          <Box
            display={'flex'}
            marginTop={'20px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text fontWeight={'bold'}>No posts available</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
