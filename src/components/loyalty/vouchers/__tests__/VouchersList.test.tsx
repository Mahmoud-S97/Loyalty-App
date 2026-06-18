import React from 'react';
import { render } from '@testing-library/react-native';
import VouchersList from '../VouchersList';

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

jest.mock('@/dummy-data', () => ({
  vouchersList: [
    { id: 1, title: 'Voucher 1', description: 'A' },
    { id: 2, title: 'Voucher 2', description: 'B' }
  ]
}));

describe('<VouchersList />', () => {
  it('renders header title', () => {
    const { getByText } = render(<VouchersList />);

    expect(getByText('app.your_vouchers')).toBeTruthy();
  });

  it('renders VouchersList correctly', () => {
    const { getByTestId } = render(<VouchersList />);

    expect(getByTestId('VouchersList:FlatList')).toBeTruthy();
  });

  it('renders FlatList structure via voucher cards', () => {
    const { getAllByTestId } = render(<VouchersList />);

    expect(getAllByTestId('VoucherCard:Mock').length).toBe(2);
  });
});
