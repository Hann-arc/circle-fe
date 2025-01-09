import { Home } from "@/pages/home"
import { Box } from "@chakra-ui/react"

export const HomeRoute = () => {
    return(
        <Box display="flex"  flexDirection="column" width={"auto"}>
            <Home />
        </Box>
    )
}