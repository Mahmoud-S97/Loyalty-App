import { Platform, ViewStyle, ColorSchemeName } from "react-native";

export const APP_COLORS = {
    primary: "#4b12a3",
    secondary: "#3c3c3c",
    neutral: {
        50: "#ffffff",
        100: "#fafafa",
        200: "#f5f5f5",
        300: "#f0f0f0",
        400: "#dedede",
        500: "#c2c2c2",
        600: "#979797",
        700: "#818181",
        800: "#606060",
        900: "#111111"
    },
    brand: {
        50: "#f4e6f8",
        100: "#e4bfed",
        200: "#d395e2",
        300: "#c269d6",
        400: "#b447cd",
        500: "#a623c3",
        600: "#9720bd",
        700: "#821cb6",
        800: "#7019ae",
        900: "#570a8fff",
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