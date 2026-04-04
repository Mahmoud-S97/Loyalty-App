import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from './i18n';
import { LOCAL_STORAGE_KEYS } from '@/constants';

// Setting the app direction. If it's Arabic then Right-To-Left else Left-To-Rright(Default)
export const initAppLanguage = async (): Promise<void> => {

  const savedLang = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.APP_LANG);
  const lang = savedLang ? JSON.parse(savedLang) : 'en';

  const isRTL = lang === 'ar';

  await i18n.changeLanguage(lang);

  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
}

// Getting the current language of the app
export const getCurrentLanguage = (): string => {
  return i18n.language;
}

// Translating the texts dynamically by calling this function anywhere in the app
export const getTranslated = (key: string): string => {
  if (!key) return key;
  return i18n.t(key);
}