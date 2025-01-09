import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useFindthreadMe } from '@/service/thread';
import { Box, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router';

export const MediaMyProfile = () => {
  const { User } = useGetMe();
  const userId = User?.id;
  const { data: threads } = useFindthreadMe(userId);
  const navigate = useNavigate()

  const isValidUrl = (url:any) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleClick = (id: number) => {
    navigate(`/detail-post-me/${id}`);
  };
  const threadsWithMedia =
    threads?.filter(
      (thread) =>
        thread.media && thread.media.trim() !== "" && isValidUrl(thread.media)
    ) || [];

    const timeThread = threads?.map((post) => post.createdAt).filter(Boolean);
    dayjs.extend(relativeTime);
    const timestamps = timeThread?.map((time) => dayjs(time));
    const time = timestamps?.map((timestamp) => dayjs().to(timestamp));


  return (
    <Box
    display="grid"
    gap="10px"
    gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
    backgroundColor="#1A1A1A"
    paddingTop="7px"
    paddingX="7px"
    minHeight="200px"
  >
    {(threadsWithMedia?.length ?? 0) > 0 ? (
      threadsWithMedia?.map((thread) => (
        <Image
          key={thread.id}
          cursor={"pointer"}
          src={thread.media}
          onClick={() => handleClick(thread.id)}
          borderRadius="8px"
          objectFit="cover"
          width="100%"
          height="auto"
        />
      ))
    ) : (
      <Box color="white" textAlign="center" padding="20px" width="100%">
        <Text fontSize="16px" fontWeight="bold">No Media yet</Text>
      </Box>
    )}
  </Box>
  
  );
};
