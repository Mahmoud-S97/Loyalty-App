import { I18nManager, Platform } from "react-native";

// Platform checks
export const is_IOS = (): boolean => {
  return Platform.OS === 'ios';
}

// Check if the App is Arabic (Right-to-Left)
export const is_RTL = (): boolean => {
  return I18nManager.isRTL;
}

// Getting the font-weight based on the App language
export const getFontWeight = (weight: 'regular' | 'medium' | 'semiBold' | 'bold'): string => {
  const fonts = {
    regular: is_RTL() ? 'font-cairo-reg' : 'font-inter-reg',
    medium: is_RTL() ? 'font-cairo-md' : 'font-inter-md',
    semiBold: is_RTL() ? 'font-cairo-semi-b' : 'font-inter-semi-b',
    bold: is_RTL() ? 'font-cairo-b' : 'font-inter-b'
  }
  return fonts[weight];
}