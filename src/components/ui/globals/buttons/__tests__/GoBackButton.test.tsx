import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { createMockTheme } from '@/utils/test-utils';
import { is_RTL } from '@/utils';

import GoBackButton from '../GoBackButton';

const mockBack = jest.fn();
const mockCanGoBack = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: mockBack,
    canGoBack: mockCanGoBack
  })
}));

jest.mock('@/Hooks/theme/useAppTheme', () => ({
  useAppTheme: jest.fn()
}));

const mockUseAppTheme = useAppTheme as jest.Mock;

jest.mock('@/Hooks/theme/useThemeStyles', () => ({
  useThemeStyles: () => ({
    shadow: {}
  })
}));

// Mock AppIcon because it has its own tests
jest.mock('@/components/ui/globals/icons/AppIcon', () => {
  const React = require('react');
  const { View } = require('react-native');

  return ({ name, size, color, type }: any) => (
    <View
      testID='AppIcon:Icon'
      name={name}
      size={size}
      color={color}
      type={type}
    />
  );
});

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  is_RTL: jest.fn()
}));

const mockIsRTL = is_RTL as jest.Mock;

describe('<GoBackButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAppTheme.mockReturnValue(
      createMockTheme({
        currentThemeColor: '#1a1a1a'
      })
    );

    mockIsRTL.mockReturnValue(false);
  });

  it('renders nothing if router cannot go back', () => {
    mockCanGoBack.mockReturnValue(false);

    const { queryByTestId } = render(<GoBackButton />);

    expect(queryByTestId('GoBackButton:Button')).toBeNull();
  });

  it('renders back button when router can go back', () => {
    mockCanGoBack.mockReturnValue(true);

    const { getByTestId } = render(<GoBackButton />);

    expect(getByTestId('GoBackButton:Button')).toBeTruthy();
  });

  it('uses default testID when no testID is provided', () => {
    mockCanGoBack.mockReturnValue(true);

    const { getByTestId } = render(<GoBackButton />);

    expect(getByTestId('GoBackButton:Button')).toBeTruthy();
  });

  it('uses custom testID when provided', () => {
    mockCanGoBack.mockReturnValue(true);

    const { getByTestId } = render(<GoBackButton testID='CustomBackButton' />);

    expect(getByTestId('CustomBackButton')).toBeTruthy();
  });

  it('calls router.back() when pressed by default', () => {
    mockCanGoBack.mockReturnValue(true);

    const { getByTestId } = render(<GoBackButton />);

    fireEvent.press(getByTestId('GoBackButton:Button'));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('calls custom onPress instead of router.back()', () => {
    mockCanGoBack.mockReturnValue(true);

    const onPress = jest.fn();

    const { getByTestId } = render(<GoBackButton onPress={onPress} />);

    fireEvent.press(getByTestId('GoBackButton:Button'));

    expect(onPress).toHaveBeenCalledTimes(1);

    expect(mockBack).not.toHaveBeenCalled();
  });

  it('passes icon size and color correctly', () => {
    mockCanGoBack.mockReturnValue(true);

    const { getByTestId } = render(
      <GoBackButton iconSize={25} iconColor='red' />
    );

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.type).toBe('FontAwesome5');

    expect(icon.props.size).toBe(25);

    expect(icon.props.color).toBe('red');
  });

  it('uses currentThemeColor as default icon color', () => {
    mockCanGoBack.mockReturnValue(true);

    mockUseAppTheme.mockReturnValue(
      createMockTheme({
        currentThemeColor: 'purple'
      })
    );

    const { getByTestId } = render(<GoBackButton />);

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.color).toBe('purple');
  });

  it('renders chevron-left icon in LTR mode', () => {
    mockCanGoBack.mockReturnValue(true);

    mockIsRTL.mockReturnValue(false);

    const { getByTestId } = render(<GoBackButton />);

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.name).toBe('chevron-left');
  });

  it('renders chevron-right icon in RTL mode', () => {
    mockCanGoBack.mockReturnValue(true);

    mockIsRTL.mockReturnValue(true);

    const { getByTestId } = render(<GoBackButton />);

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.name).toBe('chevron-right');
  });
});
