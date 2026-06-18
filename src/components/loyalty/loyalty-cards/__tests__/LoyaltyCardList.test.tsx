import React from 'react';
import { render } from '@testing-library/react-native';
import LoyaltyCardList from '../LoyaltyCardList';

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

jest.mock('@/dummy-data', () => ({
  loyaltyCardsData: [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' }
  ]
}));

describe('<LoyaltyCardList />', () => {
  it('renders section title', () => {
    const { getByText } = render(<LoyaltyCardList />);

    expect(getByText('app.your_loyalty_card')).toBeTruthy();
  });

  it('renders FlatList', () => {
    const { getByTestId } = render(<LoyaltyCardList />);

    expect(getByTestId('LoyaltyCardList:FlatList')).toBeTruthy();
  });

  it('renders all loyalty cards', () => {
    const { getAllByTestId } = render(<LoyaltyCardList />);

    expect(getAllByTestId('LoyaltyCard:Mock').length).toBe(2);
  });
});
