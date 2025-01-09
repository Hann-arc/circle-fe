import { avatar } from '@/assets';
import { ButtonFollow } from '@/components/FollowButton';
import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useFollowStore } from '@/store/followStore';
import { Box, Image, Text } from '@chakra-ui/react';

export function Following() {
  const { User } = useGetMe();
  const { follows } = useFollowStore();
  return (
    <Box display="flex" marginTop={'20px'} flexDirection={'column'}>
      {User?.following.map((users) => (
        <Box display="flex" marginBottom="10px" justifyContent="space-between">
          <Box display="flex">
            <Image
              marginLeft="22px"
              borderRadius="full"
              boxSize="40px"
              src={users.following.Profile?.avatar || avatar}
            />
            <Box
              marginLeft="16px"
              marginTop="-3px"
              display="flex"
              flexDirection="column"
            >
              <Text fontSize="14px">{users.following.fullName}</Text>
              <Text fontSize="13px" color="#909090">
                @{users.following.userName}
              </Text>
              <Text fontWeight="normal" fontSize="13px">
                {users.following.Profile?.bio || 'hello world'}
              </Text>
            </Box>
          </Box>
          <ButtonFollow
       
            
            marginTop="17px"
            followingId={users.following.id}
            isFollowing={follows[users.following.id] || false}
          />
        </Box>
      ))}
    </Box>
  );
}
