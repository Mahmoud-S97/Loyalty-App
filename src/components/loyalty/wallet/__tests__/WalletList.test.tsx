import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WalletList from '../WalletList';
import { USER_WALLET } from '@/dummy-data';

jest.mock('../WalletCard');

describe('<WalletList />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders WalletList correctly', () => {
    const { getByTestId } = render(<WalletList userWallet={USER_WALLET} />);

    expect(getByTestId('WalletList:FlatList')).toBeTruthy();
  });

  it('renders Wallet-Items from walletData correctly', () => {
    const walletItem = USER_WALLET.slice(0, 1);

    const { getByTestId, getByText } = render(
      <WalletList userWallet={walletItem} />
    );

    expect(getByTestId('WalletList:WalletCard-wallet_1')).toBeTruthy();
  });
});
