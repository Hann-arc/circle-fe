'use client';
import { Cover, LeftArrow } from "@/assets";
import { EditProfileDialogComponent } from "@/components/EditProfileDialog";
import { Avatar } from '@/components/ui/avatar';
import { DialogContent, DialogRoot } from '@/components/ui/dialog';
import { useGetMe } from "@/features/auth/hooks/use-find-me";
import { useDialogStore } from '@/store/dialogStore';
import {
  Box,
  Button,
  Image,
  Text
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

export function MyProfilePage() {
  const { isOpen, openDialog } = useDialogStore();

   const handleBack = () => {
    window.history.back();
  };
   const navigate = useNavigate();
  const goToFollowing = () => {
    navigate("/follows");
  };
  const goToFollowers = () => {
    navigate("/follows/followers");
  };

  const { User } = useGetMe();
  

  console.log("backround: ", User?.Profile?.cover)
  console.log("user: ", User)

  return (
    <Box
      display="flex"
      flexDirection="column"
      borderBottom="1px"
      borderColor={"#3F3F3F"}
      
    >
      <DialogRoot lazyMount open={isOpen} >
      <Box
        marginLeft="22px"
        marginTop="20px"
        fontSize="17px"
        fontWeight="bold"
      >
        <Box display="flex" alignItems={"center"} >
          <Button backgroundColor={"transparent"} _hover={{backgroundColor: "transparent"}}>
          <Image src={LeftArrow} cursor={"pointer"} onClick={handleBack} /></Button>
          <Text> {User?.fullName}</Text>
        </Box>
      </Box>

      <Image 
  src={User?.Profile?.cover || Cover} 
  borderRadius="15px" 
  marginX="auto" 
  height="110px" 
  width="600.5px" 
  objectFit="cover" 
  alt="Cover Image"
/>
      <Box display="flex" justifyContent="space-between">
        <Avatar
          borderRadius="full"
          border="4px solid #3F3F3F"
          boxSize="90px"
          src={User?.Profile?.avatar || ""}
          marginTop="-50px"
          marginLeft="40px"
        />
        <Button
         onClick={openDialog}
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
          Edit Profile
        </Button>
      </Box>
      <Text
        marginTop={"7px"}
        marginLeft="25px"
        fontWeight="bold"
        fontSize="17px"
      >
        {User?.fullName}
      </Text>
      <Text marginLeft="25px" marginTop={"5px"} color="#909090">
        @{User?.userName}
      </Text>
      <Text marginLeft="25px" marginTop={"5px"}>
        {User?.Profile?.bio || "Add Bio"}
      </Text>

      <Box display="flex" marginTop={"7px"} marginBottom="20px">
        <Text marginLeft="25px">
        {User?._count.following}{" "}
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
        {User?._count.followers}{" "}
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
      <DialogContent borderRadius={"20px"} backgroundColor={'#1D1D1D'}>
          <EditProfileDialogComponent />
        </DialogContent>
      </DialogRoot>
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

export default MyProfilePage;
