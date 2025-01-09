import { FollowsPage } from "@/pages/follows";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function FollowsRoute() {
  return (
    <Box display={"flex"} flexDirection={"column"} w={"auto"}>
      <FollowsPage />
      <Outlet />
    </Box>
  );
}

export default FollowsRoute;
