import { useContext } from "react";

import { AppThemeContext } from "@/store/context/theme";

export const useAppTheme = () => {
  const themeContext = useContext(AppThemeContext);
  if (!themeContext) {
    throw new Error('useAppTheme must be used within AppThemeProvider!');
  }
  return themeContext;
}