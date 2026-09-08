import {
  ref,
  putFile,
  getStorage,
  getDownloadURL,
  deleteObject
} from '@react-native-firebase/storage';
import { logger } from '@/lib/logger';

const storage = getStorage();

export const storageService = {
  uploadProfileImage: async (
    uid: string,
    filePath: string
  ): Promise<string> => {
    const imageRef = ref(storage, `/profile-images/${uid}/profile.jpg`);
    await putFile(imageRef, filePath, {
      contentType: 'image/jpeg'
    });
    return await getDownloadURL(imageRef);
  },
  getDownloadImageURL: async (uid: string): Promise<string> => {
    const imageRef = ref(storage, `/profile-images/${uid}/profile.jpg`);

    return await getDownloadURL(imageRef);
  },
  deleteProfileImage: async (uid: string): Promise<void> => {
    const imageRef = ref(storage, `/profile-images/${uid}/profile.jpg`);

    await deleteObject(imageRef);
  }
};
