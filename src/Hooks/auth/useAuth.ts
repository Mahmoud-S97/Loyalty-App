import React, { useEffect, useState } from 'react';
import { authService } from '@/services/firebase/auth.service';
import { getAuth, onAuthStateChanged, User } from '@react-native-firebase/auth';
import { AUTH_ERROR_CODES } from '@/constants';
import {
  handleAuthErrorMessage,
  isLoginValidated,
  isSignUpValidated
} from '@/utils/auth';
import { logger } from '@/lib/logger';

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

  const login = async (email: string, password: string): Promise<any> => {
    const isValidated = isLoginValidated(email, password);
    if (!isValidated) return;
    try {
      setIsLoading(true);
      const userData = await authService.login(email.toLowerCase(), password);
      return userData;
    } catch (error: any) {
      logger.log('Error in firebase-auth Login: ', error);
      const errorCode = error.code || AUTH_ERROR_CODES.something_went_wrong;
      handleAuthErrorMessage(errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<any> => {
    const isValidated = isSignUpValidated(email, password, confirmPassword);
    if (!isValidated) return;
    try {
      setIsLoading(true);
      const userData = await authService.signUp(email.toLowerCase(), password);
      return userData;
    } catch (error: any) {
      logger.log('Error in firebase-auth signUp: ', error);
      const errorCode = error.code || AUTH_ERROR_CODES.something_went_wrong;
      handleAuthErrorMessage(errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, user, isAuthenticated: !!user, login, signUp };
};
