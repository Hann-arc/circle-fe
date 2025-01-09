import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { LeftSide } from "../pages/leftSide";
import { RightSide } from "../pages/rightSiide";

export function Applayout() {
return (
    <Box
      display="flex"
      flexDirection="row"
      height="100vh"
      bg="#1A1A1A"
      color="white"
    >
      <Box
        position="fixed"
        bgColor={"#1A1A1A"}
        left={0}
        top={0}
        bottom={0}
        minWidth="375.3px"
        zIndex={2}
      >
        <LeftSide />
      </Box>
      <Box
        flex="1"
        marginLeft="375.3px"
        marginRight="505.7px"
        padding="20px 0"
      >
        <Outlet />
      </Box>
      <Box
      bgColor={"#1A1A1A"}
        position="fixed"
        right={0}
        top={0}
        bottom={0}
        minWidth="505.7px"
        zIndex={1}
      >
        <RightSide />
      </Box>
    </Box>
)
}