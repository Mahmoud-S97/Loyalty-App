import { Platform } from "react-native";


// Platform checks
export const is_IOS = (): boolean => {
    return Platform.OS === 'ios';
}