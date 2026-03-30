import React, { createContext, useEffect, useState } from "react";
import { APP_COLORS } from "@/constants/theme";
import { useColorScheme } from "react-native";

type Theme = 'light' | 'dark';

type AppThemeContextType = {
  theme: Theme,
  is_dark: boolean,
  currentThemeColor: string,
  toggleTheme: () => void,
  changeCurrentThemeColor: (themeColor: string) => void
}

export const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {

  const scheme = useColorScheme();
  const currentTheme = scheme === 'light' ? 'light' : 'dark';

  const [theme, setTheme] = useState<Theme>(currentTheme);

  const mainThemeColor = theme === 'dark' ? APP_COLORS.neutral[200] : APP_COLORS.neutral[900];

  const [currentThemeColor, setCurrentThemeColor] = useState<string>(mainThemeColor);

  useEffect(() => {
    if (currentTheme) {
      setCurrentThemeColor(currentTheme === 'dark' ? APP_COLORS.neutral[200] : APP_COLORS.neutral[900]);
      setTheme(currentTheme);
    }
  }, [currentTheme]);

  const toggleTheme = (): void => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }

  const changeCurrentThemeColor = (themeColor: string): void => {
    setCurrentThemeColor(themeColor);
  }

  const value: AppThemeContextType = { is_dark: theme === 'dark', theme, toggleTheme, currentThemeColor, changeCurrentThemeColor }

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  )
}