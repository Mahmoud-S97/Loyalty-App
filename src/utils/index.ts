import { Dimensions, Platform } from "react-native";


// Platform checks
export const is_IOS = (): boolean => {
    return Platform.OS === 'ios';
}

// Get mobile screen's width
export const getScreenWidth = (): number => {
    return Dimensions.get('window').width;
}

// Get mobile screen's height
export const getScreenHeight = (): number => {
    return Dimensions.get('window').height;
}