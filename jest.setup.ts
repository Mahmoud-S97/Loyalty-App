import { APP_COLORS } from '@/constants/theme';
import { jest } from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

jest.mock('expo-router', () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      back: jest.fn(),
      replace: jest.fn(),
      canGoBack: jest.fn(),
      dismissAll: jest.fn()
    }),
    router: {
      navigate: jest.fn(),
      back: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      canGoBack: jest.fn(),
      dismissAll: jest.fn()
    },
  };
});

jest.mock('@/Hooks/theme/useAppTheme', () => ({
  useAppTheme: () => ({
    theme: 'light',
    is_dark: false,
    currentThemeColor: '#1a1a1a',
    toggleTheme: jest.fn(),
    changeCurrentThemeColor: jest.fn()
  })
}));

afterEach(() => {
  jest.clearAllMocks();
})