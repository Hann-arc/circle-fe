import { avatar } from '@/assets';
import { ButtonFollow } from '@/components/FollowButton';
import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useFollowStore } from '@/store/followStore';
import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export function Followers() {
  const { User } = useGetMe();
  const { follows } = useFollowStore();
  const navigate = useNavigate();

  const handleDetailProfileUser = (query: string) => {
    navigate(`/${query}`);
  };

  return (
    <Box display="flex" marginTop={'20px'} flexDirection={'column'}>
      {(User?._count.followers ?? 0 > 0) ? (
        User?.followers.map((users) => (
          <Box
            display="flex"
            marginBottom="10px"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Image
                marginLeft="22px"
                borderRadius="full"
                boxSize="40px"
                src={users.follower.Profile?.avatar || avatar}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDetailProfileUser(users.follower.userName as string);
                }}
                cursor={'pointer'}
                alt="user-img"
              />
              <Box
                marginLeft="16px"
                marginTop="-3px"
                display="flex"
                flexDirection="column"
              >
                <Text
                  fontSize="14px"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetailProfileUser(users.follower.userName as string);
                  }}
                  cursor={'pointer'}
                >
                  {users.follower.fullName}
                </Text>
                <Text
                  fontSize="13px"
                  color="#909090"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetailProfileUser(users.follower.userName as string);
                  }}
                  cursor={'pointer'}
                >
                  @{users.follower.userName}
                </Text>
                <Text fontWeight="normal" fontSize="13px">
                  {users.follower.Profile?.bio || 'hello world'}
                </Text>
              </Box>
            </Box>
            <ButtonFollow
              marginTop="17px"
              followingId={users.follower.id}
              isFollowing={follows[users.follower.id] || false}
            />
          </Box>
        ))
      ) : (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Text fontWeight={'bold'}>No Followers yet</Text>
        </Box>
      )}
    </Box>
  );
}
