import {
  collection,
  doc,
  getFirestore,
  FieldValue,
  getDoc,
  getDocs,
  setDoc
} from '@react-native-firebase/firestore';
import { logger } from '@/lib/logger';
import { LoyaltyCardDto, UserWalletDto } from '@/types';

const db = getFirestore();

type CreateOrUpdateUserWalletDto = Partial<
  Omit<UserWalletDto, 'id' | 'loyaltyCards'>
> & {
  loyaltyCards: Partial<LoyaltyCardDto>[];
};

export const userWalletService = {
  getUserWallet: async (userId: string): Promise<UserWalletDto[]> => {
    if (!userId?.trim()) return [];

    const walletRef = collection(db, 'users', userId, 'userWallet');

    const walletSnapshot = await getDocs(walletRef);

    const userWallet = walletSnapshot.docs.map((walletDoc: any) => ({
      id: walletDoc.id,
      ...walletDoc.data()
    })) as UserWalletDto[];
    logger.log('Available-User-Wallet-Records: ', userWallet);
    return userWallet;
  },
  getUserWalletById: async (
    userId: string,
    shopId: string
  ): Promise<UserWalletDto | null> => {
    if (!userId?.trim() || !shopId?.trim()) return null;

    const walletDocRef = doc(
      collection(db, 'users', userId, 'userWallet', shopId)
    );
    const walletSnapshot = await getDoc(walletDocRef);

    if (!walletSnapshot.exists) {
      return null;
    }

    const wallet = {
      id: walletSnapshot.id,
      ...walletSnapshot.data()
    } as UserWalletDto;

    logger.log('Fetched-Wallet-By-Shop-ID:', wallet);

    return wallet;
  },
  createOrUpdateUserWallet: async (
    userId: string,
    shopId: string,
    data: CreateOrUpdateUserWalletDto
  ): Promise<string> => {
    if (!userId?.trim() || !shopId?.trim()) {
      throw new Error('userId and shopId are required');
    }
    const walletDocRef = doc(db, 'users', userId, 'userWallet', shopId);
    const walletData = {
      ...data,
      updatedAt: FieldValue.serverTimestamp()
    };

    const existingWallet = await getDoc(walletDocRef);

    if (!existingWallet.exists) {
      // Create new wallet-object
      await setDoc(walletDocRef, {
        ...walletData,
        createdAt: FieldValue.serverTimestamp()
      });
    } else {
      // Update existing wallet-object
      await setDoc(walletDocRef, walletData, { merge: true });
    }

    logger.log(
      existingWallet.exists()
        ? 'User-Wallet-Has-Been-Updated:'
        : 'User-Wallet-Has-Been-Created:',
      shopId
    );
    return shopId;
  }
};
