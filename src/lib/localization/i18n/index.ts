import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import en from './en.json';

type Resources = {
  en: { translation: Record<string, string | object> };
  ar: { translation: Record<string, string | object> };
};

const resources: Resources = {
  en: { translation: en },
  ar: { translation: ar }
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode === 'ar' ? 'ar' : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;