import { APP_COLORS } from "@/constants/theme";

// Mock the app theme initially as light-mode
export const createMockTheme = (overrides: any = {}) => ({
  theme: 'light',
  is_dark: false,
  currentThemeColor: APP_COLORS.neutral[200],
  toggleTheme: jest.fn(),
  changeCurrentThemeColor: jest.fn(),
  ...overrides,
});