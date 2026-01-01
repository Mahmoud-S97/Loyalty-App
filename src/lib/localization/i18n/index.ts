import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import en from './en.json';

type Resources = {
    en: { translation: Record<string, string> };
    ar: { translation: Record<string, string> };
};

const resources: Resources = {
    en: { translation: en },
    ar: { translation: ar }
};

i18n.use(initReactI18next).init({
    resources,
    lng: Localization.getLocales().find(locale => locale.languageCode === 'ar') ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;