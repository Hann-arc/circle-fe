// import { FollowsPage } from "@/pages/follows";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function UserFollowsRoute() {
  return (
    <Box display={"flex"} flexDirection={"column"} w={"auto"}>
        <Box> hao bangs</Box>
      <Outlet />
    </Box>
  );
}

export default UserFollowsRoute;
