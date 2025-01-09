import { Followers } from "@/pages/followers";
import { Box } from "@chakra-ui/react";

function FollowersRoute() {
    return (
      <Box display={"flex"} flexDirection={"column"} w={"auto"}>
        <Followers />
      </Box>
    );
  }
  
  export default FollowersRoute;