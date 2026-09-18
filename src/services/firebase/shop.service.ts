import {
  collection,
  doc,
  getFirestore,
  addDoc,
  FieldValue,
  updateDoc,
  getDocs,
  getDoc
} from '@react-native-firebase/firestore';
import { logger } from '@/lib/logger';
import { ShopDto } from '@/types';

const db = getFirestore();
const SHOPS_COLLECTION_NAME = 'shops';
const shopsCollection = collection(db, SHOPS_COLLECTION_NAME);

export const shopService = {
  getShops: async (): Promise<ShopDto[]> => {
    const shopSnapshot = await getDocs(shopsCollection);
    const availableShops = shopSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as ShopDto[];
    logger.log('Available-Shops: ', availableShops);
    return availableShops;
  },
  getShopById: async (shopId: string): Promise<ShopDto | null> => {
    if (!shopId) return null;

    const shopSnapshot = await getDoc(doc(shopsCollection, shopId));

    if (!shopSnapshot.exists) {
      return null;
    }

    logger.log('Fetched-Shop-By-ID: ', shopSnapshot);

    return {
      id: shopSnapshot.id,
      ...shopSnapshot.data()
    } as ShopDto;
  },
  createShop: async (data: Omit<ShopDto, 'id'>): Promise<string> => {
    const shopRef = await addDoc(shopsCollection, {
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
    logger.log('Shop-Profile-Was-Created: ', shopRef.id);
    return shopRef.id;
  },
  updateShop: async (
    shopId: string,
    data: Partial<Omit<ShopDto, 'id' | 'createdAt'>>
  ): Promise<string> => {
    await updateDoc(doc(shopsCollection, shopId), {
      ...data,
      updatedAt: FieldValue.serverTimestamp()
    });
    logger.log('Shop-Profile-Was-Update: ', shopId);
    return shopId;
  }
};
