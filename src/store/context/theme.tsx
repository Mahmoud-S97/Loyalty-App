import React, { createContext, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { APP_COLORS } from '@/constants/theme';

type Theme = 'light' | 'dark';

type AppThemeContextType = {
  theme: Theme;
  is_dark: boolean;
  currentThemeColor: string;
  toggleTheme: () => void;
  changeCurrentThemeColor: (themeColor: string) => void;
};

export const AppThemeContext = createContext<AppThemeContextType | undefined>(
  undefined
);

export const AppThemeProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  const theme: Theme = colorScheme === 'light' ? 'light' : 'dark';

  const is_dark = theme === 'dark';

  const defaultThemeColor = is_dark
    ? APP_COLORS.neutral[200]
    : APP_COLORS.neutral[900];

  const [currentThemeColor, setCurrentThemeColor] =
    useState<string>(defaultThemeColor);

  const toggleTheme = (): void => {
    toggleColorScheme();

    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setCurrentThemeColor(
      nextTheme === 'dark' ? APP_COLORS.neutral[200] : APP_COLORS.neutral[900]
    );
  };

  const changeCurrentThemeColor = (themeColor: string): void => {
    setCurrentThemeColor(themeColor);
  };

  const value: AppThemeContextType = {
    theme,
    is_dark,
    currentThemeColor,
    toggleTheme,
    changeCurrentThemeColor
  };

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};
