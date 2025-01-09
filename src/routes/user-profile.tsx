import ProfileUserPage from '@/pages/user-profile';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';

export const ProfileUserRoute = () => {
  return (
    <Box display="flex" flexDirection="column" w="auto">
      <Box display="flex" flexDirection="column" w="auto">
        <ProfileUserPage />
        <Outlet />
      </Box>
    </Box>
  );
};
