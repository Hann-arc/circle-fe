import { Following } from "@/pages/following";
import { Box } from "@chakra-ui/react";

function FollowingRoute() {
    return (
      <Box display={"flex"} flexDirection={"column"} w={"auto"}>
        <Following /> 
      </Box>
    );
  }
  
  export default FollowingRoute;