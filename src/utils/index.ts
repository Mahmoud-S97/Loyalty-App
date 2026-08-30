import { I18nManager, Platform } from 'react-native';
import i18n from '@/lib/localization/i18n';

export type AppFontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

// Platform checks
export const is_IOS = (): boolean => {
  return Platform.OS === 'ios';
};

// Check if the App is Arabic (Right-to-Left)
export const is_RTL = (): boolean => {
  return I18nManager.isRTL;
};

// Getting the font-weight based on the App language
export const getFontWeight = (weight: AppFontWeight): string => {
  const currentLanguage = i18n.language;
  const isArabic = currentLanguage === 'ar';

  const fonts = {
    regular: isArabic ? 'CairoRegular' : 'InterRegular',
    medium: isArabic ? 'CairoMedium' : 'InterMedium',
    semiBold: isArabic ? 'CairoSemiBold' : 'InterSemiBold',
    bold: isArabic ? 'CairoBold' : 'InterBold'
  };
  return fonts[weight];
};

export const getFormattedDate = (selectedDate: Date | string): string => {
  const currentDate =
    selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
