import { Applayout } from '@/layouts/app-layout';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useGetMe } from '../hooks/use-find-me';
import { LoadingSpiner } from '@/components/LoadingSpiner';
import { Box } from '@chakra-ui/react';
import { DetailPostImgRoute } from '@/routes/detail-post-img';

const PrivateRoute: React.FC = () => {
  const { User, isLoading, isError } = useGetMe();
  const location = useLocation();

  const detailPhotoPage = location.pathname.startsWith('/detail/photo/');

  if (isLoading) {
    return (
      <Box
        display={'flex'}
        justifyContent={'center'}
        bg={'#1A1A1A'}
        height={'100vh'}
        alignItems={'center'}
      >
        <LoadingSpiner />
      </Box>
    );
  }

  if (isError || !User) {
    return <Navigate to="/sign-in" />;
  }

 

  return  detailPhotoPage? <DetailPostImgRoute /> : <Applayout />
};

export default PrivateRoute;
