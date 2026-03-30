import { I18nManager, Platform } from "react-native";

// Platform checks
export const is_IOS = (): boolean => {
  return Platform.OS === 'ios';
}

// Check if the App is Arabic (Right-to-Left)
export const is_RTL = (): boolean => {
  return I18nManager.isRTL;
}