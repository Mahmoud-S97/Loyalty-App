import React, { Children } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import MainButton from '../MainButton';

jest.mock('@expo/vector-icons/MaterialIcons', () => {
    const React = require('react');
    const { View } = require('react-native');

    return ({ name, size, color }: { name: string, size: number, color: string }) => (
        <View
            testID='MainButton:MaterialIcons'
            name={name}
            size={size}
            color={color}
        />
    )
});

jest.mock('@/lib/localization', () => ({
    getTranslated: jest.fn()
}));

import { getTranslated } from '@/lib/localization';
import { APP_COLORS } from '@/constants/theme';


describe('<MainButton />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Renders MainButton with translated text correctly (default-behavior)', () => {

        (getTranslated as jest.Mock).mockReturnValue('Welcome to BESTIE Loyalty App');

        const { getByText } = render(<MainButton title='welcome' />);

        expect(getTranslated).toHaveBeenCalledWith('welcome');
        expect(getByText('Welcome to BESTIE Loyalty App')).toBeTruthy();
    });

    it('Renders MainButton with icon correctly', () => {

        const { getByTestId } = render(<MainButton icon='home' iconSize={25} iconColor={'#f00'} />);

        const icon = getByTestId('MainButton:MaterialIcons');

        expect(icon.props).toMatchObject({
            name: 'home',
            size: 25,
            color: '#f00'
        });
    });

    it('Renders MainButton with image correctly', () => {

        const logo = require('@/assets/images/app/logo-trans.png');

        const { getByTestId } = render(<MainButton image={logo} />);

        const renderedImage = getByTestId('MainButton:Image');

        expect(renderedImage.props.source).toBe(logo);
    });

    it('Renders children when provided to MainButton', () => {

        const { getByText } = render(<MainButton><Text>I am a child!</Text></MainButton>);

        expect(getByText('I am a child!')).toBeTruthy();
    });

    it('Does not render children when none are provided to MainButton', () => {

        const { queryByText } = render(<MainButton />);

        expect(queryByText('I am a child!')).toBeNull();
    });

    it('Prevents the MainButton from any call to action when disabled prop is passed', () => {

        const onPress = jest.fn();
        const { getByTestId } = render(<MainButton disabled={true} onPress={onPress} />);

        fireEvent.press(getByTestId('MainButton:Button'));
        expect(onPress).not.toHaveBeenCalled();
    });

    it('Calls onPress when MainButton is pressed', () => {

        const onPress = jest.fn();
        const { getByTestId } = render(<MainButton onPress={onPress} />);

        fireEvent.press(getByTestId('MainButton:Button'));
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});