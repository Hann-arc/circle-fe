import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useFindthreadMe } from '@/service/thread';
import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export const MediaMyProfile = () => {
  const { User } = useGetMe();
  const userId = User?.id;
  const { data: threads } = useFindthreadMe(userId);
  const navigate = useNavigate();

  const isValidUrl = (url: any) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  

  const handleDetailImg = (id: number)=>{
    navigate(`/detail/photo/${id}`)
  }
  const threadsWithMedia =
    threads?.filter(
      (thread) =>
        thread.media && thread.media.trim() !== '' && isValidUrl(thread.media)
    ) || [];

    return (
      <>
        {threadsWithMedia?.length > 0 ? (
          <Box
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
            backgroundColor="#1A1A1A"
            padding="7px"
          >
            {threadsWithMedia?.map((thread) => (
              <Box
                key={thread.id}
                position="relative"
                overflow="hidden"
                borderRadius="8px"
                cursor="pointer"
                onClick={() => handleDetailImg(thread.id)}
              >
                <Image
                  src={thread.media}
                  alt="Media"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  style={{
                    aspectRatio: "1/1", 
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="20px"
            width="100%"
          >
            <Text fontSize="16px" fontWeight="bold">
              No Media yet
            </Text>
          </Box>
        )}
      </>
    );
    
};
