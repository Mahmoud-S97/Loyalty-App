import React, { useEffect, useState } from 'react';
import { authService } from '@/services/firebase/auth.service';
import { getAuth, onAuthStateChanged, User } from '@react-native-firebase/auth';

const auth = getAuth();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { isLoading, user, isAuthenticated: !!user };
};
