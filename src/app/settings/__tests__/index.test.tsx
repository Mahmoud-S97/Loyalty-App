import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../index';
import { ACCOUNT_SETTINGS } from '@/constants';

jest.mock('@/components/layout/screens/ScrollingView', () => {
  const React = require('react');
  const { View } = require('react-native');

  return ({ children }: any) => <View testID='ScrollingView'>{children}</View>;
});

jest.mock('@/components/layout/screens/ContainerView', () => {
  const React = require('react');
  const { View } = require('react-native');

  return ({ children }: any) => <View testID='ContainerView'>{children}</View>;
});

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

// Mock AppBottomSheet wrapper
jest.mock('@/components/ui/modals/AppBottomSheet', () => {
  const React = require('react');
  const { View } = require('react-native');

  return React.forwardRef(({ children }: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      present: jest.fn(),
      dismiss: jest.fn()
    }));

    return <View testID='SettingsScreen:BottomSheet'>{children}</View>;
  });
});

// Mock LanguageSelector because it has its own tests
jest.mock('@/components/ui/preferences/language/LanguageSelector', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: any) => (
    <View testID='SettingsScreen:LanguageSelector' {...props} />
  );
});

const mockToggleTheme = jest.fn();

jest.mock('@/Hooks/theme/useAppTheme', () => ({
  useAppTheme: () => ({
    currentThemeColor: '#000',
    is_dark: false,
    toggleTheme: mockToggleTheme
  })
}));

jest.mock('@/Hooks/storage/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getStorageItem: jest.fn().mockResolvedValue('en'),
    setStorageItem: jest.fn()
  })
}));

jest.mock('@/lib/localization/i18n', () => ({
  changeLanguage: jest.fn()
}));

jest.mock('expo-updates', () => ({
  reloadAsync: jest.fn()
}));

describe('<SettingsScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header', () => {
    const { getByTestId } = render(<SettingsScreen />);

    expect(getByTestId('SettingsScreen:Header')).toBeTruthy();
  });

  it('renders all settings rows', () => {
    const { getAllByTestId } = render(<SettingsScreen />);

    expect(getAllByTestId('SettingsScreen:TouchableOpacity').length).toBe(
      ACCOUNT_SETTINGS.length
    );
  });

  it('renders appearance switch', () => {
    const { getByTestId } = render(<SettingsScreen />);

    expect(getByTestId('SettingsScreen:AppearanceSwitch')).toBeTruthy();
  });

  it('passes current theme state to switch', () => {
    const { getByTestId } = render(<SettingsScreen />);

    const switchComponent = getByTestId('SettingsScreen:AppearanceSwitch');

    expect(switchComponent.props.value).toBe(false);
  });

  it('calls toggleTheme when appearance switch changes', () => {
    const { getByTestId } = render(<SettingsScreen />);

    fireEvent(
      getByTestId('SettingsScreen:AppearanceSwitch'),
      'valueChange',
      true
    );

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('renders AppIcons for settings rows', () => {
    const { getAllByTestId } = render(<SettingsScreen />);

    expect(getAllByTestId('SettingsScreen:AppIcon').length).toBeGreaterThan(0);
  });

  it('opens language selector when language row is pressed', async () => {
    const { getAllByTestId, findByTestId } = render(<SettingsScreen />);

    const languageRowIndex = ACCOUNT_SETTINGS.findIndex(
      (row) => row.cta === 'language'
    );

    expect(languageRowIndex).toBeGreaterThanOrEqual(0);

    fireEvent.press(
      getAllByTestId('SettingsScreen:TouchableOpacity')[languageRowIndex]
    );

    expect(await findByTestId('SettingsScreen:LanguageSelector')).toBeTruthy();
  });
});
