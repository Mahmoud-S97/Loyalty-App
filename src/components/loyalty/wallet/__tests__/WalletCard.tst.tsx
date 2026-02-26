import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WalletCard from '../WalletCard';
import { WalletItem } from '@/types';
import { walletData } from '@/dummy-data';

jest.mock('@/components/layout/screens/ContainerView');

const walletItem = walletData[0]; // Dummy-data

describe('<WalletCard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders WalletCard correctly', () => {

    const { getByTestId } = render(<WalletCard item={walletItem} index={0} />);

    expect(getByTestId('WalletCard:AnimatedView')).toBeTruthy();
  });

  // Will be handled later, for now just asserting the existancy
  it('navigates to Loyalty-Screen correctly', () => {

    const { getByTestId } = render(<WalletCard item={walletItem} index={0} />);

    const cardNavigatorButton = getByTestId('WalletCard:TouchableOpacity');

    expect(cardNavigatorButton).toBeTruthy();
  })
})