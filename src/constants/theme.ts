import { Platform, ViewStyle, ColorSchemeName } from "react-native";

export const APP_COLORS = {
    primary: "#621ce5",
    secondary: "#232323",
    neutral: {
        50: "#ffffff",
        100: "#fafafa",
        200: "#f2f2f2",
        300: "#e6e6e6",
        400: "#d4d4d4",
        500: "#bdbdbd",
        600: "#9a9a9a",
        700: "#7a7a7a",
        800: "#5a5a5a",
        900: "#1a1a1a",
        950: "#101010ff"
    },
    brand: {
        50: "#f3f2ff",
        100: "#ebe8ff",
        200: "#d9d3ff",
        300: "#beb0ff",
        400: "#9e84ff",
        500: "#8052ff",
        600: "#712ef9",
        700: "#621ce5",
        800: "#5618c9",
        900: "#45159d",
        950: "#280a6b",
    },
    accent: {
        DEFAULT: "#AB8BFF",
        overlay: "rgba(171, 139, 255, 0.56)",
    }
}

export const shadowStyle = (scheme: ColorSchemeName): ViewStyle => Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: scheme === 'dark' ? 0.20 : 0.15,
        shadowRadius: scheme === 'dark' ? 24 : 20,
    },
    android: {
        elevation: scheme === 'dark' ? 12 : 8,
    },
}) ?? {};

export const cardShadowStyle = (scheme: ColorSchemeName): ViewStyle => Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: scheme === 'dark' ? 0.16 : 0.10,
        shadowRadius: scheme === 'dark' ? 22 : 8,
    },
    android: {
        elevation: scheme === 'dark' ? 10 : 6,
    },
}) ?? {};