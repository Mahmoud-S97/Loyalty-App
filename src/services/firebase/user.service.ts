import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  FieldValue,
  deleteDoc,
  updateDoc
} from '@react-native-firebase/firestore';
import { UserProfile } from '@/types/user';
import { logger } from '@/lib/logger';

const db = getFirestore();
const USERS_COLLECTION_NAME = 'users';
const usersCollection = collection(db, USERS_COLLECTION_NAME);

export const userService = {
  getUserProfile: async (uid: string): Promise<UserProfile | null> => {
    const userSnapshot = await getDoc(doc(usersCollection, uid));
    if (!userSnapshot.exists) {
      return null;
    }
    return {
      uid: userSnapshot.id,
      ...userSnapshot.data()
    } as UserProfile;
  },
  createUserProfile: async (
    uid: string,
    data: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
  ): Promise<void> => {
    const userData = await setDoc(doc(usersCollection, uid), {
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
    logger.log('User-Profile-Was-Created: ', userData);
  },
  updateUserProfile: async (
    uid: string,
    data: Partial<Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>>
  ): Promise<void> => {
    const userData = await updateDoc(doc(usersCollection, uid), {
      ...data,
      updatedAt: FieldValue.serverTimestamp()
    });
    logger.log('User-Profile-Was-Updated: ', userData);
  },
  deleteUserProfile: async (uid: string): Promise<void> => {
    const userResponse = await deleteDoc(doc(usersCollection, uid));
    logger.log('User-Profile-Was-Deleted: ', userResponse);
  }
};
