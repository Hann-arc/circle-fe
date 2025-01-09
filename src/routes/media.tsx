import { MediaMyProfile } from "@/pages/media-my-profile";
import { Box, Text } from "@chakra-ui/react";

function MediaRoute() {
    return (
      <Box display={"flex"} flexDirection={"column"} w={"auto"}>
        <MediaMyProfile />
      </Box>
    );
  }
  
  export default MediaRoute;