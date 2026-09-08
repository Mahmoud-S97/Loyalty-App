import React, { useEffect, useState } from 'react';
import { UserProfile } from '@/types/user';
import { userService } from '@/services/firebase/user.service';
import { storageService } from '@/services/firebase/storage.service';
import {
  FIRESTORE_ERROR_CODES,
  STORAGE_ERROR_CODES
} from '@/constants/account/userProfile';
import {
  handleFirestoreErrorMessage,
  handleStorageErrorMessage
} from '@/utils/userProfile';
import { useAuth } from '../auth/useAuth';

export const useUser = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.uid) return;

    getUserProfile(user.uid);
  }, [user?.uid]);

  const uploadUserProfileImage = async (
    uid: string,
    filePath: string
  ): Promise<string | null> => {
    if (!uid || !filePath) return null;
    try {
      setIsProfileLoading(true);
      const photoURL = await storageService.uploadProfileImage(uid, filePath);
      return photoURL;
    } catch (error: any) {
      const errorCode = error.code || STORAGE_ERROR_CODES.something_went_wrong;
      handleStorageErrorMessage(errorCode);
      return null;
    } finally {
      setIsProfileLoading(false);
    }
  };

  const deleteUserProfileImage = async (uid: string): Promise<boolean> => {
    try {
      setIsProfileLoading(true);
      await storageService.deleteProfileImage(uid);
      return true;
    } catch (error: any) {
      const errorCode = error.code || STORAGE_ERROR_CODES.something_went_wrong;
      handleStorageErrorMessage(errorCode);
      return false;
    } finally {
      setIsProfileLoading(false);
    }
  };

  const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    if (!uid) {
      return null;
    }
    try {
      setIsProfileLoading(true);
      const profileData = await userService.getUserProfile(uid);
      if (!profileData) {
        return null;
      }
      setUserProfile(profileData);
      return profileData;
    } catch (error: any) {
      const errorCode =
        error.code || FIRESTORE_ERROR_CODES.something_went_wrong;
      handleFirestoreErrorMessage(errorCode);
      return null;
    } finally {
      setIsProfileLoading(false);
    }
  };

  const createUserProfile = async (
    uid: string,
    data: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
  ): Promise<void> => {
    if (!uid) return;
    try {
      setIsLoading(true);
      await userService.createUserProfile(uid, data);
      await getUserProfile(uid);
    } catch (error: any) {
      const errorCode =
        error.code || FIRESTORE_ERROR_CODES.something_went_wrong;
      handleFirestoreErrorMessage(errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (
    uid: string,
    data: Partial<Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>>
  ): Promise<void> => {
    if (!uid) return;
    try {
      setIsLoading(true);
      await userService.updateUserProfile(uid, data);
      await getUserProfile(uid);
    } catch (error: any) {
      const errorCode =
        error.code || FIRESTORE_ERROR_CODES.something_went_wrong;
      handleFirestoreErrorMessage(errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserProfile = async (uid: string): Promise<void> => {
    if (!uid) return;
    try {
      setIsLoading(true);
      await userService.deleteUserProfile(uid);
      setUserProfile(null);
    } catch (error: any) {
      const errorCode =
        error.code || FIRESTORE_ERROR_CODES.something_went_wrong;
      handleFirestoreErrorMessage(errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userProfile,
    isProfileLoading,
    isLoading,
    getUserProfile,
    createUserProfile,
    uploadUserProfileImage,
    deleteUserProfileImage,
    updateUserProfile,
    deleteUserProfile
  };
};
