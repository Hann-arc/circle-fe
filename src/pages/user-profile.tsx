import { Cover, LeftArrow } from "@/assets";
import { LoadingSpiner } from "@/components/LoadingSpiner";
import { Avatar } from '@/components/ui/avatar';
import { useGetDetailUser } from "@/service/user";
import {
    Box,
    Button,
    Image,
    Text
} from "@chakra-ui/react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

 function ProfileUserPage() {
    
  const { query } = useParams();
  console.log('query:', query);
  const {data: user, isLoading} = useGetDetailUser(String(query))
   const handleBack = () => {
    window.history.back();
  };

  if (isLoading) {
      <LoadingSpiner />;
      console.log('Loading data...');
    } else {
      console.log('data: ', user);
      console.log('username:', user?.userName);
     
    }
    console.log('folllowrs:', user?._count.followers );

   const navigate = useNavigate();
  const goToFollowing = () => {
    navigate("/follows");
  };
  const goToFollowers = () => {
    navigate("/follows/followers");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      borderBottom="1px"
      borderColor={"#3F3F3F"}
    >
      <Box
        marginLeft="22px"
        marginTop="20px"
        fontSize="17px"
        fontWeight="bold"
      >
        <Box display="flex" alignItems={"center"} >
          <Button backgroundColor={"transparent"} _hover={{backgroundColor: "transparent"}}>
          <Image src={LeftArrow} cursor={"pointer"} onClick={handleBack} /></Button>
          <Text> {user?.fullName}</Text>
        </Box>
      </Box>

      <Image src={user?.Profile?.cover || Cover} borderRadius="15px" marginLeft="22.5px" height="110px" width="610.5px" />
      <Box display="flex" justifyContent="space-between">
        <Avatar
          borderRadius="full"
          border="4px solid #3F3F3F"
          boxSize="90px"
          src={user?.Profile?.avatar}
          marginTop="-50px"
          marginLeft="40px"
        />
        <Button
          color="white"
          borderRadius="20px"
          backgroundColor="transparent"
          marginRight="20px"
          border="2px solid"
          size="sm"
          marginTop={"5px"}
          padding="4px 15px"
          fontSize="sm"
        >
          Follow
        </Button>
      </Box>
      <Text
        marginTop={"7px"}
        marginLeft="25px"
        fontWeight="bold"
        fontSize="17px"
      >
        {user?.fullName}
      </Text>
      <Text marginLeft="25px" marginTop={"5px"} color="#909090">
        @{user?.userName}
      </Text>
      <Text marginLeft="25px" marginTop={"5px"}>
        {user?.Profile?.bio}
      </Text>

      <Box display="flex" marginTop={"7px"} marginBottom="20px">
        <Text marginLeft="25px">
        {user?._count.following}{" "}
          <Text
            as="span"
            onClick={goToFollowing}
            cursor={"pointer"}
            color="#909090"
          >
            Following
          </Text>
        </Text>
        <Text marginLeft="25px">
        {user?._count.followers}{" "}
          <Text
            as="span"
            onClick={goToFollowers}
            cursor={"pointer"}
            color="#909090"
          >
            Followers
          </Text>
        </Text>
      </Box>

      <Box
        display="flex"
        justifyContent="space-around"
        borderBottom="1px solid"
        borderColor={"#3F3F3F"}
      >
        <NavLink
          to=""
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            borderBottom: isActive ? "2px solid #04A51E" : "none",
            padding: "1px 0",
          })}
          end
        >
          All Post
        </NavLink>
        <NavLink
          to="media"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            borderBottom: isActive ? "2px solid #04A51E" : "none",
            padding: "1px 0",
          })}
        >
          Media
        </NavLink>
      </Box>
    </Box>
  );
}

export default ProfileUserPage