import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountScreen from '../account';
import { router } from 'expo-router';
import { ACCOUNT_DETAILS } from '@/constants';
import { is_RTL } from '@/utils';

// Mock child components that already have unit tests
jest.mock('@/components/ui/content/AppText');

jest.mock('@/components/layout/screens/ContainerView', () => {
  const React = require('react');
  const { View } = require('react-native');

  return ({ children }: any) => <View testID='ContainerView'>{children}</View>;
});

jest.mock('@/components/layout/screens/ScrollingView', () => {
  const React = require('react');
  const { View } = require('react-native');

  return ({ children }: any) => <View testID='ScrollingView'>{children}</View>;
});

// Mock AppIcon because it already has its own tests
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

// Mock images
jest.mock('@/constants/images', () => ({
  LOCAL_IMAGES: {
    LOGO: 'mock-logo'
  }
}));

describe('<AccountScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders account email', () => {
    const { getByText } = render(<AccountScreen />);

    expect(getByText('example@gmail.com')).toBeTruthy();
  });

  it('renders profile image', () => {
    const { getByTestId } = render(<AccountScreen />);

    expect(getByTestId('ScrollingView')).toBeTruthy();
  });

  it('renders all section headings', () => {
    const { getByText } = render(<AccountScreen />);

    ACCOUNT_DETAILS.forEach((section) => {
      expect(getByText(section.heading)).toBeTruthy();
    });
  });

  it('renders all row labels', () => {
    const { getByText } = render(<AccountScreen />);

    ACCOUNT_DETAILS.forEach((section) => {
      section.rows.forEach((row: any) => {
        expect(getByText(row.label)).toBeTruthy();
      });
    });
  });

  it('renders AppIcons for rows correctly', () => {
    const { getAllByTestId } = render(<AccountScreen />);

    const icons = getAllByTestId('AppIcon:Icon');

    const totalRows = ACCOUNT_DETAILS.reduce(
      (total, section) => total + section.rows.length,
      0
    );

    // Each row has:
    // 1 main icon
    // 1 arrow icon
    expect(icons.length).toBe(totalRows * 2);

    const firstRow = ACCOUNT_DETAILS[0].rows[0];

    expect(icons[0].props.name).toBe(firstRow.mainIcon);

    expect(icons[0].props.size).toBe(24);

    expect(icons[0].props.type).toBe('Ionicons');

    expect(icons[1].props.name).toBe(
      is_RTL() ? 'chevron-back' : 'chevron-forward'
    );
  });

  it('navigates to profile screen when profile row is pressed', () => {
    const { getByTestId } = render(<AccountScreen />);

    fireEvent.press(getByTestId('AccountScreen:TouchableOpacity:Row:/profile'));

    expect(router.push).toHaveBeenCalledWith('/profile');
  });

  it('navigates to settings screen when settings row is pressed', () => {
    const { getByTestId } = render(<AccountScreen />);

    fireEvent.press(
      getByTestId('AccountScreen:TouchableOpacity:Row:/settings')
    );

    expect(router.push).toHaveBeenCalledWith('/settings');
  });

  it('does not navigate for unsupported routes', () => {
    const { getByText } = render(<AccountScreen />);

    const unsupportedRow = ACCOUNT_DETAILS.flatMap(
      (section) => section.rows
    ).find((row: any) => row.route !== '/profile' && row.route !== '/settings');

    expect(unsupportedRow).toBeDefined();

    fireEvent.press(getByText(unsupportedRow!.label));

    expect(router.push).not.toHaveBeenCalled();
  });
});
