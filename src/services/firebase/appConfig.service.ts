import {
  getDoc,
  doc,
  collection,
  getFirestore
} from '@react-native-firebase/firestore';
import { AppPreferences } from '@/types';

const db = getFirestore();
const APP_CONFIG_COLLECTION_NAME = 'appConfig';
const APP_PREFERENCES_DOCUMENT = 'preferences';

const appConfigCollection = collection(db, APP_CONFIG_COLLECTION_NAME);

export const appConfigService = {
  getAppPreferences: async (): Promise<AppPreferences | null> => {
    const snapshot = await getDoc(
      doc(appConfigCollection, APP_PREFERENCES_DOCUMENT)
    );

    if (!snapshot.exists) {
      return null;
    }

    return snapshot.data() as AppPreferences;
  }
};
