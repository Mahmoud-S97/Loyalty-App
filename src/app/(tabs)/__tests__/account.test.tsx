import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountScreen from '../account';
import { router } from 'expo-router';
import { ACCOUNT_DETAILS } from '@/constants';

// Mock child components that already have unit tests
jest.mock('@/components/ui/content/AppText');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');
jest.mock('@/components/layout/screens/ScrollingView', () => 'ScrollingView');

// Mock images
jest.mock('@/constants/images', () => ({
  LOCAL_IMAGES: {
    LOGO: 'mock-logo'
  }
}));

// Mock Ionicons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    Ionicons: ({ name, size, color, testID }: any) => (
      <View
        testID={testID || `icon-${name}`}
        name={name}
        size={size}
        color={color}
      />
    )
  };
});

describe('<AccountScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders account email', () => {
    const { getByText } = render(<AccountScreen />);

    expect(getByText('example@gmail.com')).toBeTruthy();
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

  it('renders row icons with theme color', () => {
    const { getByTestId } = render(<AccountScreen />);

    const firstRow = ACCOUNT_DETAILS[0].rows[0];

    const icon = getByTestId(`icon-${firstRow.mainIcon}`);

    expect(icon.props.name).toBe(firstRow.mainIcon);
    expect(icon.props.size).toBe(24);
    expect(icon.props.color).toBe('#1a1a1a');
  });

  it('navigates to profile screen when profile row is pressed', () => {
    const { getByTestId } = render(<AccountScreen />);

    const pressedRoute = getByTestId(
      'AccountScreen:TouchableOpacity:Row:/profile'
    );

    fireEvent.press(pressedRoute);

    expect(router.push).toHaveBeenCalledWith('/profile');
  });

  it('navigates to settings screen when settings row is pressed', () => {
    const { getByTestId } = render(<AccountScreen />);

    const pressedRoute = getByTestId(
      'AccountScreen:TouchableOpacity:Row:/settings'
    );

    fireEvent.press(pressedRoute);

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
