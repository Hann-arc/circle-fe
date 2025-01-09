import { MyProfileAllPost } from "@/pages/my-profile-all-post"
import { Box } from "@chakra-ui/react"

function MyProfileAllPostRoute() {
    return (
      <Box display={"flex"}  flexDirection={"column"} w={"auto"}>
        <MyProfileAllPost/>
      </Box>
    );
  }
  
  export default MyProfileAllPostRoute;