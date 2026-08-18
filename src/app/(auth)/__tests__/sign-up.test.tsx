import React from 'react';
import { fireEvent, render, act } from '@testing-library/react-native';
import { router } from 'expo-router';

import SignUpScreen from '@/app/(auth)/sign-up';
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

describe('<SignUpScreen />', () => {
  const signUpMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    signUpMock.mockResolvedValue({
      uid: 'test-user-id'
    });

    mockedUseAuth.mockReturnValue({
      isLoading: false,
      user: null,
      isAuthenticated: false,
      login: jest.fn(),
      signUp: signUpMock
    });
  });

  it('renders SignUp screen', () => {
    const { getByTestId } = render(<SignUpScreen />);

    expect(getByTestId('SignUpScreen:KeyboardAvoidingView')).toBeTruthy();

    expect(getByTestId('SignUpScreen:SignUpBtn')).toBeTruthy();
  });

  it('signs up when SignUp button is clicked', async () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(
      getByTestId('SignUpScreen:EmailInput'),
      'test@example.com'
    );

    fireEvent.changeText(
      getByTestId('SignUpScreen:PasswordInput'),
      'password123'
    );

    fireEvent.changeText(
      getByTestId('SignUpScreen:ConfirmPasswordInput'),
      'password123'
    );

    await act(async () => {
      fireEvent.press(getByTestId('SignUpScreen:SignUpBtn'));
    });

    expect(signUpMock).toHaveBeenCalledTimes(1);

    expect(signUpMock).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      'password123'
    );
  });

  it('navigates to Login screen after successful sign up', async () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(
      getByTestId('SignUpScreen:EmailInput'),
      'test@example.com'
    );

    fireEvent.changeText(
      getByTestId('SignUpScreen:PasswordInput'),
      'password123'
    );

    fireEvent.changeText(
      getByTestId('SignUpScreen:ConfirmPasswordInput'),
      'password123'
    );

    await act(async () => {
      fireEvent.press(getByTestId('SignUpScreen:SignUpBtn'));
    });

    expect(mockedRouterReplace).toHaveBeenCalledWith('/login');
  });

  it('navigates to Login screen when Login button is clicked', () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.press(getByTestId('SignUpScreen:LoginBtn'));

    expect(mockedRouterReplace).toHaveBeenCalledWith('/login');
  });
});
