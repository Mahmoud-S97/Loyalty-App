import React from 'react';
import { render } from '@testing-library/react-native';
import LoyaltyCardList from '../LoyaltyCardList';
import { USER_WALLET } from '@/dummy-data';

const loyaltyCardsList = USER_WALLET[0].loyaltyCards.filter(
  (card) => card.stamps < USER_WALLET[0].threshold
);

const threshold = USER_WALLET[0].threshold ?? 0;
const shopLogo = USER_WALLET[0]?.shopLogo;

jest.mock('@/components/ui/content/AppText');

jest.mock('../LoyaltyCard', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  return (props: any) => (
    <View testID='LoyaltyCard:Mock'>
      <Text>{props.title}</Text>
    </View>
  );
});

jest.mock('@/Hooks/layout/useScreenDimensions', () => ({
  useScreenDimensions: () => ({
    SCREEN_WIDTH: 400
  })
}));

describe('<LoyaltyCardList />', () => {
  it('renders section title', () => {
    const { getByText } = render(
      <LoyaltyCardList
        loyaltyCardsList={loyaltyCardsList}
        threshold={threshold}
        shopLogo={shopLogo}
      />
    );

    expect(getByText('app.your_loyalty_card')).toBeTruthy();
  });

  it('renders FlatList', () => {
    const { getByTestId } = render(
      <LoyaltyCardList
        loyaltyCardsList={loyaltyCardsList}
        threshold={threshold}
        shopLogo={shopLogo}
      />
    );

    expect(getByTestId('LoyaltyCardList:FlatList')).toBeTruthy();
  });

  it('renders all loyalty cards', () => {
    const { getAllByTestId } = render(
      <LoyaltyCardList
        loyaltyCardsList={loyaltyCardsList}
        threshold={threshold}
        shopLogo={shopLogo}
      />
    );

    expect(getAllByTestId('LoyaltyCard:Mock').length).toBe(1);
  });
});
