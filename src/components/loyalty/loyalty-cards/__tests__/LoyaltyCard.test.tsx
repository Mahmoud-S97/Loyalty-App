import React from 'react';
import { render } from '@testing-library/react-native';
import LoyaltyCard from '../LoyaltyCard';
import { LOCAL_IMAGES } from '@/constants';

jest.mock('@/components/ui/content/AppText');

jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    Image: (props: any) => (
      <View testID={props.testID || 'LoyaltyCard:Image'} {...props} />
    )
  };
});

jest.mock('@/Hooks/theme/useThemeStyles', () => ({
  useThemeStyles: () => ({
    cardShadow: {}
  })
}));

jest.mock('@/Hooks/layout/useScreenDimensions', () => ({
  useScreenDimensions: () => ({
    SCREEN_WIDTH: 400
  })
}));

describe('<LoyaltyCard />', () => {
  const baseProps = {
    id: 'card_1',
    title: 'Test Card',
    description: 'desc',
    threshold: 5,
    stamps: 2,
    shopLogo: 'logo.png',
    loyaltyIcon: LOCAL_IMAGES.LOGO_TRANS
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders main touchable card', () => {
    const { getByTestId } = render(<LoyaltyCard {...baseProps} />);

    expect(getByTestId('LoyaltyCard:TouchableOpacity')).toBeTruthy();
  });

  it('renders correct number of stamp slots', () => {
    const { queryAllByTestId } = render(<LoyaltyCard {...baseProps} />);

    expect(queryAllByTestId('LoyaltyCard:StampImage').length).toBe(2); // stamps filled = 2
  });

  it('does not render stamps beyond threshold', () => {
    const { queryAllByTestId } = render(
      <LoyaltyCard {...baseProps} threshold={0} />
    );

    expect(queryAllByTestId('LoyaltyCard:StampImage').length).toBe(0);
  });

  it('renders logo image when provided', () => {
    const { queryByTestId } = render(<LoyaltyCard {...baseProps} />);

    expect(queryByTestId('LoyaltyCard:Logo')).toBeTruthy();
  });
});
