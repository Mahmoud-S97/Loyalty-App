import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WalletList from '../WalletList';
import { WalletItem } from '@/types';
import { walletData } from '@/dummy-data';

jest.mock('../WalletCard');

describe('<WalletList />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders WalletList correctly', () => {

    const { getByTestId } = render(<WalletList walletData={walletData} />);

    expect(getByTestId('WalletList:FlatList')).toBeTruthy();
  });

  it('renders Wallet-Items from walletData correctly', () => {

    const walletItem = walletData.slice(0, 1);

    const { getByTestId, getByText } = render(<WalletList walletData={walletItem} />);

    expect(getByTestId('WalletList:WalletCard-1')).toBeTruthy();
    expect(getByText('Snipz Barbershop')).toBeTruthy();
  });

  it('renders empty state when walletData is empty', () => {

    const {getByText} = render(<WalletList walletData={[]} />);
    expect(getByText('No wallet items found')).toBeTruthy();
  });
})