import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function FollowsPage() {


  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-around"
        borderBottom="1px solid #3F3F3F"
       
      >
        <NavLink
          to=""
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            borderBottom: isActive ? "2px solid #04A51E" : "none",
            padding: "8px 0",
          })}
          end
        >
          Following
        </NavLink>
        <NavLink
          to="followers"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            borderBottom: isActive ? "2px solid #04A51E" : "none",
            padding: "8px 0",
          })}
        >
          Followers
        </NavLink>
      </Box>
    </Box>
  );
}
