import React from 'react';
import { render } from '@testing-library/react-native';
import VouchersList from '../VouchersList';
import { USER_WALLET } from '@/dummy-data';

const vouchersList = USER_WALLET[0].loyaltyCards?.filter(
  (voucher) => voucher.stamps >= USER_WALLET[0].threshold
);

jest.mock('@/components/ui/content/AppText');

jest.mock('../VoucherCard', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  return (props: any) => (
    <View testID='VoucherCard:Mock'>
      <Text>{props.title}</Text>
    </View>
  );
});

jest.mock('@/Hooks/layout/useScreenDimensions', () => ({
  useScreenDimensions: () => ({
    SCREEN_WIDTH: 400
  })
}));

describe('<VouchersList />', () => {
  it('renders header title', () => {
    const { getByText } = render(<VouchersList vouchersList={vouchersList} />);

    expect(getByText('app.your_vouchers')).toBeTruthy();
  });

  it('renders VouchersList correctly', () => {
    const { getByTestId } = render(
      <VouchersList vouchersList={vouchersList} />
    );

    expect(getByTestId('VouchersList:FlatList')).toBeTruthy();
  });

  it('renders FlatList structure via voucher cards', () => {
    const { getAllByTestId } = render(
      <VouchersList vouchersList={vouchersList} />
    );

    expect(getAllByTestId('VoucherCard:Mock').length).toBe(1);
  });
});
