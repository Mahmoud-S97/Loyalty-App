import { I18nManager } from 'react-native';
import i18n from './i18n';

// Setting the app direction. If it's Arabic then Right-To-Left else Left-To-Rright(Default)
export const initAppLanguage = (): void => {
    const isRTL = i18n.language === 'ar';
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
}

// Getting the current language of the app
export const getCurrentLanguage = (): string => {
    return i18n.language;
}

// Translating the texts dynamically by calling this function anywhere in the app
export const getTranslated = (key: string): string => {
    if(!key) return key;
    return i18n.t(key);
}