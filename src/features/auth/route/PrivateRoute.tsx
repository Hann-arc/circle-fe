import { Applayout } from '@/layouts/app-layout';
import React from 'react';
import { Navigate } from 'react-router';
import { useGetMe } from '../hooks/use-find-me';
import { LoadingSpiner } from '@/components/LoadingSpiner';

const PrivateRoute: React.FC = () => {
  const { User, isLoading, isError } = useGetMe();

  if (isLoading) {
    return <LoadingSpiner />
  }

  if (isError || !User) {
    return <Navigate to="/sign-in" />;
  }
  
 return <Applayout />
  
 
};

export default PrivateRoute;
