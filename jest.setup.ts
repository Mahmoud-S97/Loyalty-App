import { APP_COLORS } from '@/constants/theme';
import { jest } from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-nfc-manager');

jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  sendEmailVerification: jest.fn()
}));

const mockNavigate = jest.fn();
const mockPush = jest.fn();
const mockBack = jest.fn();
const mockReplace = jest.fn();
const mockCanGoBack = jest.fn();
const mockDismissAll = jest.fn();

jest.mock('expo-router', () => {
  return {
    useRouter: () => ({
      push: mockPush,
      back: mockBack,
      replace: mockReplace,
      canGoBack: mockCanGoBack,
      dismissAll: mockDismissAll
    }),
    router: {
      navigate: mockNavigate,
      push: mockPush,
      back: mockBack,
      replace: mockReplace,
      canGoBack: mockCanGoBack,
      dismissAll: mockDismissAll
    }
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
});
