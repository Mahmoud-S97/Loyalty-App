import React from 'react';
import { render } from '@testing-library/react-native';
import NotificationScreen from '../index';
import { notificationData } from '@/dummy-data';

jest.mock('@/components/layout/screens/ScreenView', () => 'ScreenView');

jest.mock('@/components/layout/navigation/header/MainHeader', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: any) => (
    <View testID='NotificationScreen:MainHeader' {...props} />
  );
});

jest.mock('@/components/loyalty/notification/NotificationList', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: any) => (
    <View testID='NotificationScreen:NotificationList' {...props} />
  );
});

jest.mock('@/components/ui/content/AppText');

describe('<NotificationScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders MainHeader', () => {
    const { getByTestId } = render(<NotificationScreen />);

    expect(getByTestId('NotificationScreen:MainHeader')).toBeTruthy();
  });

  it('renders NotificationList', () => {
    const { getByTestId } = render(<NotificationScreen />);

    expect(getByTestId('NotificationScreen:NotificationList')).toBeTruthy();
  });

  it('passes correct title to MainHeader', () => {
    const { getByTestId } = render(<NotificationScreen />);

    const header = getByTestId('NotificationScreen:MainHeader');

    expect(header.props.title).toBe('app.notifications');
  });

  it('passes correct textClassName to MainHeader', () => {
    const { getByTestId } = render(<NotificationScreen />);

    const header = getByTestId('NotificationScreen:MainHeader');

    expect(header.props.textClassName).toBe('text-left ps-6');
  });

  it('passes endComponent to MainHeader', () => {
    const { getByTestId } = render(<NotificationScreen />);

    const header = getByTestId('NotificationScreen:MainHeader');

    expect(header.props.endComponent).toBeTruthy();
  });
});
