import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../index';
import { ACCOUNT_SETTINGS } from '@/constants';

jest.mock('@/components/layout/screens/ScrollingView', () => 'ScrollingView');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');

jest.mock('@/components/layout/navigation/header/MainHeader', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: any) => <View testID='SettingsScreen:Header' {...props} />;
});

jest.mock('@/components/ui/content/AppText');

jest.mock('@/components/ui/globals/icons/AppIcon', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: any) => <View testID='SettingsScreen:AppIcon' {...props} />;
});

const mockToggleTheme = jest.fn();

jest.mock('@/Hooks/theme/useAppTheme', () => ({
  useAppTheme: () => ({
    currentThemeColor: '#000',
    is_dark: false,
    toggleTheme: mockToggleTheme
  })
}));

describe('<SettingsScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header', () => {
    const { getByTestId } = render(<SettingsScreen />);

    expect(getByTestId('SettingsScreen:Header')).toBeTruthy();
  });

  it('renders Switch for appearance setting only', () => {
    const { getByTestId } = render(<SettingsScreen />);

    expect(getByTestId('SettingsScreen:AppearanceSwitch')).toBeTruthy();
  });

  it('renders ACCOUNT_SETTINGS rows correctly', () => {
    const { getAllByTestId } = render(<SettingsScreen />);

    expect(getAllByTestId('SettingsScreen:TouchableOpacity').length).toBe(
      ACCOUNT_SETTINGS.length
    );
  });

  it('toggles theme when switch changes', () => {
    const { getByTestId } = render(<SettingsScreen />);

    fireEvent(
      getByTestId('SettingsScreen:AppearanceSwitch'),
      'valueChange',
      true
    );

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
