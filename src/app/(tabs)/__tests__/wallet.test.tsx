import React from 'react';
import { render } from '@testing-library/react-native';
import WalletScreen from '../wallet';
import { walletData } from '@/dummy-data';

jest.mock('@/components/layout/screens/ScreenView', () => 'ScreenView');

jest.mock('@/components/layout/navigation/header/MainHeader', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: any) => <View testID='WalletScreen:MainHeader' {...props} />;
});

jest.mock('@/components/loyalty/wallet/WalletList', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: any) => <View testID='WalletScreen:WalletList' {...props} />;
});

describe('<WalletScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders MainHeader', () => {
    const { getByTestId } = render(<WalletScreen />);

    expect(getByTestId('WalletScreen:MainHeader')).toBeTruthy();
  });

  it('renders WalletList', () => {
    const { getByTestId } = render(<WalletScreen />);

    expect(getByTestId('WalletScreen:WalletList')).toBeTruthy();
  });

  it('passes correct props to MainHeader', () => {
    const { getByTestId } = render(<WalletScreen />);

    const header = getByTestId('WalletScreen:MainHeader');

    expect(header.props.withGoBackButton).toBe(false);

    expect(header.props.title).toBe('app.your_wallet');

    expect(header.props.className).toBe('bg-brand-400');

    expect(header.props.textClassName).toBe('w-full text-start');
  });

  it('passes walletData to WalletList', () => {
    const { getByTestId } = render(<WalletScreen />);

    const walletList = getByTestId('WalletScreen:WalletList');

    expect(walletList.props.walletData).toEqual(walletData);
  });
});
