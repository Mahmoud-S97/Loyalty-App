import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { authService } from '@/services/firebase/auth.service';
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  User
} from '@react-native-firebase/auth';
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
      await userData.reload();
      if (!userData?.emailVerified) {
        handleAuthErrorMessage(AUTH_ERROR_CODES.email_not_verified);
        return;
      }
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
      if (userData) {
        await sendEmailVerification(userData);
      }
      return userData;
    } catch (error: any) {
      logger.log('Error in firebase-auth signUp: ', error);
      const errorCode = error.code || AUTH_ERROR_CODES.something_went_wrong;
      handleAuthErrorMessage(errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  const checkEmailVerification = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return false;
      }

      for (let attempt = 0; attempt < 5; attempt++) {
        await currentUser.reload();

        const refreshedUser = auth.currentUser;

        logger.log(
          `Verification check #${attempt + 1}:`,
          refreshedUser?.emailVerified
        );

        if (refreshedUser?.emailVerified) {
          return true;
        } else {
          handleAuthErrorMessage(AUTH_ERROR_CODES.email_not_verified);
          return false;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error: any) {
      const errorCode = error.code || AUTH_ERROR_CODES.something_went_wrong;
      handleAuthErrorMessage(errorCode);
      return false;
    } finally {
      setIsLoading(false);
    }

    return false;
  };

  const resendVerificationEmail = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      await sendEmailVerification(currentUser);
    } catch (error: any) {
      const errorCode = error.code || AUTH_ERROR_CODES.something_went_wrong;
      handleAuthErrorMessage(errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    user,
    isAuthenticated: !!user,
    isEmailVerified: !!user?.emailVerified,
    resendVerificationEmail,
    checkEmailVerification,
    login,
    signUp
  };
};
