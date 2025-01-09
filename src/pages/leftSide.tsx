'use client';
import {
  Heart,
  Home,
  HomeActive,
  LikeActive,
  Logout,
  Profile,
  ProfileActive,
  User as Search,
  UserActive as SearchActive,
} from '@/assets';
import ButtonSide from '@/components/ButtonSide';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useDialogStore } from '@/store/dialogStore';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export function LeftSide() {
  const { logout } = useLogout();
  const { openDialog } = useDialogStore();
  const navigate = useNavigate();

 
  const createThread = () => {
    navigate('/');
    openDialog();
  };


  return (
    <Box
      borderRight="1px"
      borderColor={'#3F3F3F'}
      minHeight="100vh"
      borderStyle="solid"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box marginLeft="54px" marginTop="36px">
        <Heading as="h1" size="3xl" color="#FDBA74">
          {/* #00D632 */}
          Circle
        </Heading>
        <Box
          display="flex"
          flexDirection="column"
          marginTop="40px"
          w="252.75px"
          gap="6px"
        > 
          <ButtonSide
            icon={Home}
            activeIcon={HomeActive}
            label="Home"
            path="/"
          />
          <ButtonSide
            icon={Search}
            activeIcon={SearchActive}
            label="Search"
            path="/search"
          />
          <ButtonSide
            icon={Heart}
            activeIcon={LikeActive}
            label="Follows"
            path="/follows"
          />
          <ButtonSide
            icon={Profile}
            activeIcon={ProfileActive}
            label="Profile"
            path="/profile"
          />

          <Button
            onClick={createThread}
            backgroundColor="#FDBA74"
            //#00D632
            height="40.8px"
            alignItems="center"
            justifyContent="center"
            borderRadius="12px"
            _hover={{ backgroundColor: '#FB9E57' }}
            _active={{ backgroundColor: '#F97316' }}
          >
            Create Post
          </Button>
        </Box>
      </Box>

      <Box padding="16px" marginLeft={'40px'} w="252.75px">
        <Button
          height="57.6px"
          display="flex"
          alignItems="center"
          variant="ghost"
          gap="16px"
          _hover={{
            backgroundColor: 'rgba(255,255,255, 0.1)',
          }}
          onClick={logout}
        >
          <Image src={Logout} w="28.8px" />
          <Text color="white">Logout</Text>
        </Button>
      </Box>
    </Box>
  );
}
