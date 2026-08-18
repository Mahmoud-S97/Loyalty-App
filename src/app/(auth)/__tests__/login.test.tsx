import React from 'react';
import { fireEvent, render, act } from '@testing-library/react-native';
import { router } from 'expo-router';

import LoginScreen from '@/app/(auth)/login';
import { useAuth } from '@/Hooks/auth/useAuth';

jest.mock('@/Hooks/auth/useAuth');

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    navigate: jest.fn()
  }
}));

const mockedUseAuth = jest.mocked(useAuth);
const mockedRouterReplace = jest.mocked(router.replace);

describe('<LoginScreen />', () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    loginMock.mockResolvedValue({
      uid: 'test-user-id'
    });

    mockedUseAuth.mockReturnValue({
      isLoading: false,
      user: null,
      isAuthenticated: false,
      login: loginMock,
      signUp: jest.fn()
    });
  });

  it('renders Login screen', () => {
    const { getByTestId } = render(<LoginScreen />);

    expect(getByTestId('LoginScreen:KeyboardAvoidingView')).toBeTruthy();

    expect(getByTestId('LoginScreen:LoginBtn')).toBeTruthy();
  });

  it('logs in when Login button is clicked', async () => {
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.changeText(
      getByTestId('LoginScreen:EmailInput'),
      'test@example.com'
    );

    fireEvent.changeText(
      getByTestId('LoginScreen:PasswordInput'),
      'password123'
    );

    await act(async () => {
      fireEvent.press(getByTestId('LoginScreen:LoginBtn'));
    });

    expect(loginMock).toHaveBeenCalledTimes(1);

    expect(loginMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('navigates to Home screen after successful login', async () => {
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.changeText(
      getByTestId('LoginScreen:EmailInput'),
      'test@example.com'
    );

    fireEvent.changeText(
      getByTestId('LoginScreen:PasswordInput'),
      'password123'
    );

    await act(async () => {
      fireEvent.press(getByTestId('LoginScreen:LoginBtn'));
    });

    expect(mockedRouterReplace).toHaveBeenCalledWith('/home');
  });

  it('navigates to SignUp screen', () => {
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.press(getByTestId('LoginScreen:SignUpBtn'));

    expect(mockedRouterReplace).toHaveBeenCalledWith('/sign-up');
  });

  it('navigates to Forgot Password screen', () => {
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.press(getByTestId('LoginScreen:ForgotPasswordBtn'));

    expect(router.navigate).toHaveBeenCalledWith('/forgot-password');
  });
});
