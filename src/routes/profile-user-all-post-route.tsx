import { UserProfileAllPost } from "@/pages/profile-user-all-post";
import { Box } from "@chakra-ui/react";

function UserProfileAllPostRoute() {
    return (
      <Box display={"flex"}  flexDirection={"column"} w={"auto"}>
        <UserProfileAllPost/>
      </Box>
    );
  }
  
  export default UserProfileAllPostRoute;