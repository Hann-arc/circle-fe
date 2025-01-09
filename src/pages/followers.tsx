import { avatar } from "@/assets";
import { ButtonFollow } from "@/components/FollowButton";
import { useGetMe } from "@/features/auth/hooks/use-find-me";
import { useFollowStore } from "@/store/followStore";
import { Box, Image, Text } from "@chakra-ui/react";

export function Followers() {

  const { User } = useGetMe()
  const { follows } = useFollowStore();
  return (
    <Box display="flex" marginTop={"20px"} flexDirection={"column"}>
      {User?.followers.map((users) => (
          <Box display="flex" marginBottom="10px" justifyContent="space-between">
          <Box display="flex">
            <Image
              marginLeft="22px"
              borderRadius="full"
              boxSize="40px"
              src={users.follower.Profile?.avatar || avatar}
              alt="user-img"
            />
            <Box
              marginLeft="16px"
              marginTop="-3px"
              display="flex"
              flexDirection="column"
            >
              <Text fontSize="14px">{users.follower.fullName}</Text>
              <Text fontSize="13px" color="#909090">
                @{users.follower.userName}
              </Text>
              <Text fontWeight="normal" fontSize="13px">
                {users.follower.Profile?.bio || "hello world"}
              </Text>
            </Box>
          </Box>
          <ButtonFollow marginTop="17px" followingId={users.follower.id}
            isFollowing={follows[users.follower.id] || false}/>
        </Box>
      ))}
    
    </Box>
  );
}
