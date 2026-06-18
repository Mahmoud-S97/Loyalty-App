import React from 'react';
import { render } from '@testing-library/react-native';
import AppIcon from '../AppIcon';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockIcon = (props: any) => <View testID='AppIcon:Icon' {...props} />;

  return {
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    FontAwesome: MockIcon,
    Feather: MockIcon,
    AntDesign: MockIcon
  };
});

describe('<AppIcon />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders container', () => {
    const { getByTestId } = render(<AppIcon type='Ionicons' name='home' />);

    expect(getByTestId('AppIcon:Container')).toBeTruthy();
  });

  it('renders icon', () => {
    const { getByTestId } = render(<AppIcon type='Ionicons' name='home' />);

    expect(getByTestId('AppIcon:Icon')).toBeTruthy();
  });

  it('passes icon props correctly', () => {
    const { getByTestId } = render(
      <AppIcon type='Ionicons' name='home' size={40} color='red' />
    );

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.name).toBe('home');
    expect(icon.props.size).toBe(40);
    expect(icon.props.color).toBe('red');
  });

  it('uses default size', () => {
    const { getByTestId } = render(<AppIcon type='Ionicons' name='home' />);

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.size).toBe(24);
  });

  it('uses default color', () => {
    const { getByTestId } = render(<AppIcon type='Ionicons' name='home' />);

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.color).toBe('#000');
  });

  it('renders MaterialIcons icon', () => {
    const { getByTestId } = render(
      <AppIcon type='MaterialIcons' name='settings' />
    );

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.name).toBe('settings');
  });

  it('renders Feather icon', () => {
    const { getByTestId } = render(<AppIcon type='Feather' name='user' />);

    const icon = getByTestId('AppIcon:Icon');

    expect(icon.props.name).toBe('user');
  });
});
