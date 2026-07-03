import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WalletCard from '../WalletCard';
import { USER_WALLET } from '@/dummy-data';
import { router } from 'expo-router';

jest.mock('@/components/layout/screens/ContainerView');

const walletItem = USER_WALLET[0]; // Dummy-data

describe('<WalletCard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders WalletCard correctly', () => {
    const { getByTestId } = render(<WalletCard item={walletItem} index={0} />);

    expect(getByTestId('WalletCard:AnimatedView')).toBeTruthy();
  });

  it('navigates to Loyalty-Screen correctly', () => {
    const { getByTestId } = render(<WalletCard item={walletItem} index={0} />);

    const cardNavigatorButton = getByTestId('WalletCard:TouchableOpacity');

    expect(cardNavigatorButton).toBeTruthy();

    fireEvent.press(cardNavigatorButton);
    expect(router.push).toHaveBeenCalledTimes(1);
  });
});
