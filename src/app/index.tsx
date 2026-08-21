import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/Hooks/auth/useAuth';
import Spinner from '@/components/ui/globals/Spinner';

const Index = () => {
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if(isAuthenticated && !isEmailVerified) {
    return <Redirect href="/(auth)/verify-email" />
  }

  if (isAuthenticated) {
    return <Redirect href='/(tabs)/home' />;
  }

  return <Redirect href='/(auth)/intro' />;
};

export default Index;
