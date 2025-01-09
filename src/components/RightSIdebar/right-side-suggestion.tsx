import { Avatar } from "@/components/ui/avatar";
import { useGetSuggestedUser } from "@/hooks/user";
import { Box, Text } from "@chakra-ui/react";
import { ButtonFollow } from "../FollowButton";
import { LoadingSpiner } from "../LoadingSpiner";

export function RightSideSuggestion() {

 const {suggestedUser, isLoading, isError} = useGetSuggestedUser()

 if (isLoading){
  return <LoadingSpiner />
 }

  if(isError){
    return <div>Error</div>
  }

  return (
    <Box
      marginTop="10px"
      marginLeft="31px"
      marginRight="31px"
      borderRadius="20px"
      display="flex"
      gap="10px"
      flexDirection="column"
      backgroundColor="#262626"
    >
      <Text
        fontWeight="bold"
        marginLeft="22px"
        marginTop="20px"
        marginBottom="10px"
        fontSize="17px"
      >
        Suggested for you
      </Text>
      <Box display="flex" flexDirection="column" marginBottom="10px">
        {suggestedUser && suggestedUser.length > 0 ? (
          suggestedUser.map((user) => (
            <Box
              key={user.id}
              display="flex"
              marginBottom="10px"
              justifyContent="space-between"
            >
              <Box display="flex">
                <Avatar
                  marginLeft="22px"
                  borderRadius="full"
                  boxSize="40px"
                  src={user.Profile?.avatar || "default.jpg"}
                />
                <Box
                  marginLeft="16px"
                  marginTop="-2px"
                  display="flex"
                  flexDirection="column"
                >
                  <Text fontSize="15px" fontWeight="bold">
                    {user.fullName}
                  </Text>
                  <Text fontSize="15px" color="#909090">
                    @{user.userName}
                  </Text>
                </Box>
              </Box>
              <ButtonFollow followingId={user.id} isFollowing={false} />
            </Box>
          ))
        ) : (
          <Box marginLeft="22px" >
            <Text marginBottom={"20px"} color="#909090">No suggested users available</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
  
}
