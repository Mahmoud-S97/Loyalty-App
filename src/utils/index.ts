import { I18nManager, Platform } from 'react-native';
import i18n from '@/lib/localization/i18n';
import { ShopDto } from '@/types';

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

export const getShopIsOpen = (
  openingHours: ShopDto['openingHours']
): boolean => {
  const now = new Date();

  const dayNames = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ] as const;

  const todayName = dayNames[now.getDay()];
  const todayHours = openingHours[todayName];

  if (!todayHours.openAt || !todayHours.closeAt) {
    return false;
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openHour, openMinute] = todayHours.openAt.split(':').map(Number);

  const [closeHour, closeMinute] = todayHours.closeAt.split(':').map(Number);

  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return isOpen;
};