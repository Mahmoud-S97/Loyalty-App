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
export const getFontWeight = (weight: string): string => {
  switch (weight) {
    case 'regular':
      return is_RTL() ? 'font-cairo-reg' : 'font-inter-reg';
      break;
    case 'medium':
      return is_RTL() ? 'font-cairo-md' : 'font-inter-md';
      break;
    case 'semiBold':
      return is_RTL() ? 'font-cairo-semi-b' : 'font-inter-semi-b';
      break;
    case 'bold':
      return is_RTL() ? 'font-cairo-b' : 'font-inter-b';
      break;
    default:
      return is_RTL() ? 'font-cairo-reg' : 'font-inter-reg';
  }
}