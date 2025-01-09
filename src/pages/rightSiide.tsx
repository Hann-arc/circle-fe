import { RightSideFooter } from '../components/RightSIdebar/right-side-footer';
import { RightSideMyProfile } from '../components/RightSIdebar/right-side-myprofile';
import { Box } from '@chakra-ui/react';
import { RightSideSuggestion } from '../components/RightSIdebar/right-side-suggestion';
import { useLocation, matchPath } from 'react-router';

export function RightSide() {
  const location = useLocation();

  const isProfileRoute =
    location.pathname === '/profile' || location.pathname === '/profile/media';

  const isDetailPostRoute = matchPath('/detail-post-me/:id', location.pathname);

  return (
    <Box
      borderLeft={'1px solid'}
      borderColor={'#3F3F3F'}
      minHeight="100vh"
      paddingTop={'20px'}
    >
      {!(isProfileRoute || isDetailPostRoute) && <RightSideMyProfile />}
      <RightSideSuggestion />
      <RightSideFooter />
    </Box>
  );
}
