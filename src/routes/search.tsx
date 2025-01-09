import { SearchComponent } from '@/pages/search';
import { Box } from '@chakra-ui/react';

export const SearchRoute = () => (
  <Box display="flex" flexDirection="column" width={'auto'}>
    <Box fontWeight={'bold'} display={'flex'} justifyContent={'center'}>
      <SearchComponent />
    </Box>
  </Box>
);
