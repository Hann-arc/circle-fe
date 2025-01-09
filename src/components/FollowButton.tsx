import { Box, Button, ButtonProps } from "@chakra-ui/react";
import { useFollow } from "@/hooks/useFollow";
import { useEffect, useState } from "react";
import { useFollowStore } from "@/store/followStore";

interface ButtonFollowProps extends ButtonProps {
  followingId: number;
  isFollowing: boolean;
}

export const ButtonFollow: React.FC<ButtonFollowProps> = ({ followingId, ...props }) => {
  const { mutateAsync } = useFollow();
  const { follows, toggleFollow } = useFollowStore();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
   
    setIsFollowing(follows[followingId] || false);
  }, [follows, followingId]);

  const handleFollowToggle = async () => {
    try {
      const response = await mutateAsync({ followingId });
      const isCurrentlyFollowing = response?.message === "berhasil follow";
      toggleFollow(followingId, isCurrentlyFollowing);
    } catch (error) {
      console.error("Error while toggling follow:", error);
    }
  };

  return (
    <Box>
      {isFollowing? ( <Button
      color={'#909090'}
      borderRadius="20px"
      marginTop="7px"
      marginRight="20px"
          border="2px solid #909090"
      size="sm"
      onClick={handleFollowToggle}
      padding="4px 12px"
      fontSize="sm"
      backgroundColor="transparent"
      transition="all 0.2s ease-in-out"
      _hover={{
        backgroundColor: "white",
        color: "black",
        borderColor: "black",
      }}
      {...props}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>): (
       <Button
       color="white"
       borderRadius="20px"
       marginTop="7px"
       marginRight="20px"
       border="2px solid white"
       size="sm"
       onClick={handleFollowToggle}
       padding="4px 12px"
       fontSize="sm"
       backgroundColor="transparent"
       transition="all 0.2s ease-in-out"
       _hover={{
         backgroundColor: "white",
         color: "black",
         borderColor: "black",
       }}
       {...props}
     >
       {isFollowing ? "Unfollow" : "Follow"}
     </Button>
    )}
    </Box>
   
  );
};
