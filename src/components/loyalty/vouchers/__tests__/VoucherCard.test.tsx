import React from 'react';
import { render } from '@testing-library/react-native';
import VoucherCard from '../VoucherCard';
import { vouchersList } from '@/dummy-data';

jest.mock('@/components/ui/content/AppText');

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

describe('<VoucherCard />', () => {
  const baseProps = {
    id: 1,
    image: vouchersList[0].image,
    title: 'Reward Free Haircut',
    description: 'Redeem Now'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders touchable card', () => {
    const { getByTestId } = render(<VoucherCard {...baseProps} />);

    expect(getByTestId('VoucherCard:TouchableOpacity')).toBeTruthy();
  });

  it('renders title text inside ImageBackground', () => {
    const { getByText } = render(<VoucherCard {...baseProps} />);

    expect(getByText('Reward Free Haircut')).toBeTruthy();
  });

  it('renders description text', () => {
    const { getByText } = render(<VoucherCard {...baseProps} />);

    expect(getByText('Redeem Now')).toBeTruthy();
  });

  it('renders ImageBackground when image source provided', () => {
    const { getByTestId } = render(<VoucherCard {...baseProps} />);

    expect(getByTestId('VoucherCard:ImageBackground')).toBeTruthy();
  });

  it('does not render ImageBackground when image is missing', () => {
    const { queryByText } = render(
      <VoucherCard title='No Image' description='Test' />
    );

    expect(queryByText('No Image')).toBeNull();
  });

  it('applies correct card width calculation', () => {
    const { UNSAFE_getByType } = render(<VoucherCard {...baseProps} />);

    const touchable = UNSAFE_getByType(
      require('react-native').TouchableOpacity
    );

    expect(touchable.props.style[1].width).toBe(208);
    // 400 * 0.52 = 208
  });
});
