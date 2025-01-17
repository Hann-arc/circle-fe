import { MediaUserProfile } from "@/pages/user-profile-media";
import { Box } from "@chakra-ui/react";

function UserProfileMediaRoute() {
    return (
      <Box display={"flex"} flexDirection={"column"} w={"auto"}>
       <MediaUserProfile />
      </Box>
    );
  }
  
  export default UserProfileMediaRoute;