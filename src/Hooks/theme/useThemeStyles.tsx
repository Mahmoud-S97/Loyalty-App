import { cardShadowStyle, shadowStyle } from "@/constants/theme";
import { useAppTheme } from "./useAppTheme";

export const useThemeStyles = () => {
  const { is_dark } = useAppTheme();

  return { shadow: shadowStyle(is_dark), cardShadow: cardShadowStyle(is_dark) }
}