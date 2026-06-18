import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GenderIcon from '../GenderIcon';

jest.mock('@/components/ui/content/AppText');

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    Ionicons: (props: any) => <View testID='GenderIcon:Icon' {...props} />
  };
});

describe('<GenderIcon />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders icon correctly', () => {
    const { getByTestId } = render(
      <GenderIcon iconName='male' iconSize={40} />
    );

    const icon = getByTestId('GenderIcon:Icon');

    expect(icon.props.name).toBe('male');
    expect(icon.props.size).toBe(40);
  });

  it('renders icon label', () => {
    const { getByText } = render(<GenderIcon iconLabel='Male' />);

    expect(getByText('Male')).toBeTruthy();
  });

  it('does not render label when iconLabel is missing', () => {
    const { queryByText } = render(<GenderIcon />);

    expect(queryByText('Male')).toBeNull();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();

    const { getByTestId } = render(<GenderIcon onPress={onPress} />);

    fireEvent.press(getByTestId('GenderIcon:Button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
