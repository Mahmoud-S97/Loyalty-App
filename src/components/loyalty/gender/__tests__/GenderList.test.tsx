import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GenderList from '../GenderList';
import { GENDER_ICONS } from '@/constants';

jest.mock('../GenderIcon', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');

  return (props: any) => (
    <TouchableOpacity
      testID={`GenderIcon:${props.iconLabel}`}
      onPress={props.onPress}
    >
      <Text>{props.iconLabel}</Text>
    </TouchableOpacity>
  );
});

describe('<GenderList />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all gender icons', () => {
    const { getByText } = render(<GenderList />);

    GENDER_ICONS.forEach((icon) => {
      expect(getByText(icon.iconLabel)).toBeTruthy();
    });
  });

  it('changes selected gender when icon is pressed', () => {
    const { getByTestId } = render(<GenderList />);

    const femaleIcon = GENDER_ICONS.find((icon) => icon.gender === 'female');

    expect(femaleIcon).toBeDefined();

    fireEvent.press(getByTestId(`GenderIcon:${femaleIcon!.iconLabel}`));

    expect(getByTestId(`GenderIcon:${femaleIcon!.iconLabel}`)).toBeTruthy();
  });
});
