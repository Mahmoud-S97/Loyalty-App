import { I18nManager } from 'react-native';
import i18n from './i18n';

export const initAppLanguage = (): void => {
    const isRTL = i18n.language === 'ar';
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
}

export const getCurrentLanguage = (): string => {
    return i18n.language;
}