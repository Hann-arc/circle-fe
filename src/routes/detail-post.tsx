import { DetailPost } from "@/pages/detail-post";
import { Box } from "@chakra-ui/react";

function DetailRout() {
    return (
      <Box display={"flex"}  flexDirection={"column"} w={"auto"}>
        <DetailPost/>
      </Box>
    );
  }
  
  export default DetailRout;