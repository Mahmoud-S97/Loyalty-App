import { act, fireEvent, render } from '@testing-library/react-native';
import VerifyEmailScreen from '../verify-email';
import { router } from 'expo-router';
import { useAuth } from '@/Hooks/auth/useAuth';
import { authService } from '@/services/firebase/auth.service';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import type { User } from '@react-native-firebase/auth';

// Mock the rendered components which have their own unit-tests
jest.mock('@/components/ui/globals/buttons/MainButton');
jest.mock('@/components/ui/content/AppText');
jest.mock('@/components/ui/globals/icons/AppIcon');

// Mock the rendered screen-wrappers which have their own unit-tests
jest.mock('@/components/layout/screens/ScrollingView', () => 'ScrollingView');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');

// Mock hooks/services
jest.mock('@/Hooks/auth/useAuth');
jest.mock('@/Hooks/theme/useAppTheme');
jest.mock('@/services/firebase/auth.service');

// Mock localization
jest.mock('@/lib/localization', () => ({
  getTranslated: jest.fn((key, options) => {
    if (key === 'auth.resendVerificationEmailIn') {
      return `Resend verification email in ${options?.countdown}s`;
    }

    return key;
  })
}));

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const mockedUseAppTheme = useAppTheme as jest.MockedFunction<
  typeof useAppTheme
>;

const checkEmailVerificationMock = jest.fn();

const resendVerificationEmailMock = jest.fn();

const sendPasswordResetEmailMock = jest.fn();

const logoutMock = jest
  .spyOn(authService, 'logout')
  .mockResolvedValue(undefined);

const mockUser = {
  email: 'test@example.com'
} as User;

describe('<VerifyEmailScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.useFakeTimers();

    mockedUseAppTheme.mockReturnValue({
      currentThemeColor: '#000000'
    } as ReturnType<typeof useAppTheme>);

    mockedUseAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
      isEmailVerified: false,

      checkEmailVerification: checkEmailVerificationMock,
      resendVerificationEmail: resendVerificationEmailMock,
      sendPasswordResetEmail: sendPasswordResetEmailMock,

      login: jest.fn(),
      signUp: jest.fn()
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders VerifyEmailScreen correctly', () => {
    const { getByTestId, getByText } = render(<VerifyEmailScreen />);

    expect(getByTestId('VerifyEmailScreen:CheckVerificationBtn')).toBeTruthy();

    expect(getByTestId('VerifyEmailScreen:UseAnotherEmailBtn')).toBeTruthy();

    expect(getByText('test@example.com')).toBeTruthy();

    expect(getByText('Resend verification email in 30s')).toBeTruthy();
  });

  it('checks email verification and navigates to Home when verified', async () => {
    checkEmailVerificationMock.mockResolvedValue(true);

    const { getByTestId } = render(<VerifyEmailScreen />);

    const checkVerificationButton = getByTestId(
      'VerifyEmailScreen:CheckVerificationBtn'
    );

    await act(async () => {
      fireEvent.press(checkVerificationButton);
    });

    expect(checkEmailVerificationMock).toHaveBeenCalledTimes(1);

    expect(router.replace).toHaveBeenCalledWith('/home');

    expect(router.replace).toHaveBeenCalledTimes(1);
  });

  it('does not navigate when email is not verified', async () => {
    checkEmailVerificationMock.mockResolvedValue(false);

    const { getByTestId } = render(<VerifyEmailScreen />);

    const checkVerificationButton = getByTestId(
      'VerifyEmailScreen:CheckVerificationBtn'
    );

    await act(async () => {
      fireEvent.press(checkVerificationButton);
    });

    expect(checkEmailVerificationMock).toHaveBeenCalledTimes(1);

    expect(router.replace).not.toHaveBeenCalled();
  });

  it('shows Resend Verification Email after countdown reaches zero', () => {
    const { getByTestId, queryByTestId } = render(<VerifyEmailScreen />);

    expect(queryByTestId('VerifyEmailScreen:ResendVerificationBtn')).toBeNull();

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(getByTestId('VerifyEmailScreen:ResendVerificationBtn')).toBeTruthy();
  });

  it('resends verification email and restarts the countdown', async () => {
    resendVerificationEmailMock.mockResolvedValue(undefined);

    const { getByTestId, getByText, queryByTestId } = render(
      <VerifyEmailScreen />
    );

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    const resendButton = getByTestId('VerifyEmailScreen:ResendVerificationBtn');

    await act(async () => {
      fireEvent.press(resendButton);
    });

    expect(resendVerificationEmailMock).toHaveBeenCalledTimes(1);

    expect(queryByTestId('VerifyEmailScreen:ResendVerificationBtn')).toBeNull();

    expect(getByText('Resend verification email in 30s')).toBeTruthy();
  });

  it('logs out and navigates to Sign Up when using another email', async () => {
    logoutMock.mockClear();

    const { getByTestId } = render(<VerifyEmailScreen />);

    const useAnotherEmailButton = getByTestId(
      'VerifyEmailScreen:UseAnotherEmailBtn'
    );

    await act(async () => {
      fireEvent.press(useAnotherEmailButton);
    });

    expect(logoutMock).toHaveBeenCalledTimes(1);

    expect(router.replace).toHaveBeenCalledWith('/sign-up');

    expect(router.replace).toHaveBeenCalledTimes(1);
  });

  it('counts down from 30 seconds correctly', () => {
    const { getByText } = render(<VerifyEmailScreen />);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(getByText('Resend verification email in 20s')).toBeTruthy();
  });
});
