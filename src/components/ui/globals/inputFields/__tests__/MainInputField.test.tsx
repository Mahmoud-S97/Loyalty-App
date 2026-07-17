import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import MainInputField from '../MainInputField';

jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const React = require('react');
  const { View } = require('react-native');

  return ({ name, size, color }: any) => (
    <View
      testID='MainInputField:MaterialIcons'
      name={name}
      size={size}
      color={color}
    />
  );
});

jest.mock('@/components/ui/globals/icons/AppIcon', () => {
  const React = require('react');
  const { View } = require('react-native');

  return ({ name, size, color, type }: any) => (
    <View
      testID='AppIcon:Icon'
      name={name}
      size={size}
      color={color}
      type={type}
    />
  );
});

describe('<MainInputField />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders wrapper and TextInput correctly', () => {
    const { getByTestId } = render(
      <MainInputField value='example@gmail.com' />
    );

    const wrapper = getByTestId('MainInputField:WrapperView');
    const input = getByTestId('MainInputField:TextInput');

    expect(wrapper).toBeTruthy();
    expect(input).toBeTruthy();

    expect(input.props.value).toBe('example@gmail.com');
  });

  it('uses custom testID for TextInput', () => {
    const { getByTestId } = render(<MainInputField testID='EmailInput' />);

    expect(getByTestId('EmailInput')).toBeTruthy();
  });

  it('renders MaterialIcons when icon prop is provided', () => {
    const { getByTestId } = render(
      <MainInputField icon='home' iconColor='red' iconSize={25} />
    );

    const icon = getByTestId('MainInputField:MaterialIcons');

    expect(icon.props.name).toBe('home');
    expect(icon.props.color).toBe('red');
    expect(icon.props.size).toBe(25);
  });

  it('does not render icon when withIcon is false', () => {
    const { queryByTestId } = render(
      <MainInputField icon='home' withIcon={false} />
    );

    expect(queryByTestId('MainInputField:MaterialIcons')).toBeNull();
  });

  it('renders password toggle button', () => {
    const toggleShowPassword = jest.fn();

    const { getByTestId } = render(
      <MainInputField
        secureTextEntry
        isPasswordField
        iconSize={26}
        iconColor='blue'
        toggleShowPassword={toggleShowPassword}
      />
    );

    const button = getByTestId('MainInputField:ToggleEyeButton');

    const icon = getByTestId('AppIcon:Icon');

    expect(button).toBeTruthy();

    expect(icon.props.type).toBe('FontAwesome5');

    expect(icon.props.name).toBe('eye-slash');

    expect(icon.props.size).toBe(26);

    expect(icon.props.color).toBe('blue');
  });

  it('calls toggleShowPassword when eye button is pressed', () => {
    const toggleShowPassword = jest.fn();

    const { getByTestId } = render(
      <MainInputField isPasswordField toggleShowPassword={toggleShowPassword} />
    );

    fireEvent.press(getByTestId('MainInputField:ToggleEyeButton'));

    expect(toggleShowPassword).toHaveBeenCalledTimes(1);
  });

  it('passes TextInput props correctly', () => {
    const onChangeText = jest.fn();

    const { getByTestId } = render(
      <MainInputField
        value='hello'
        maxLength={10}
        multiline
        scrollEnabled={false}
        editable={false}
        secureTextEntry
        onChangeText={onChangeText}
      />
    );

    const input = getByTestId('MainInputField:TextInput');

    expect(input.props.value).toBe('hello');

    expect(input.props.maxLength).toBe(10);

    expect(input.props.multiline).toBe(true);

    expect(input.props.scrollEnabled).toBe(false);

    expect(input.props.editable).toBe(false);

    expect(input.props.secureTextEntry).toBe(true);
  });
});
