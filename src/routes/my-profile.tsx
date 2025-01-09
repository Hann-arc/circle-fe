import ProfilePage from "@/pages/my-profile"
import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router"

export const MyProfileRoute = () => {
    return(
        <Box display="flex"  flexDirection="column" w="auto">
            <ProfilePage  />
            <Outlet />
        </Box>
    )
}