import React, { act } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import MainInputField from '../MainInputField';

jest.mock('@expo/vector-icons/MaterialIcons', () => {
    const React = require('react');
    const { View } = require('react-native');

    return ({ name, size, color }: { name: string, size: number, color: string }) => (
        <View
            testID='GoBackButton:MaterialIcons'
            name={name}
            size={size}
            color={color}
        />
    )
});

jest.mock('@expo/vector-icons/FontAwesome5', () => {
    const React = require('react');
    const { View } = require('react-native');

    return ({ name, size, color }: { name: string, size: number, color: string }) => (
        <View
            testID='GoBackButton:FontAwesome5'
            name={name}
            size={size}
            color={color}
        />
    )
});


describe('<MainInputField />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Renders MainInputField (wrapper-view and TextInput) correctly', async () => {
        const { getByTestId } = render(<MainInputField value='example@gmail.com' />);

        const wrapperView = getByTestId('MainInputField:WrapperView');
        const textInput = getByTestId('MainInputField:TextInput');

        await waitFor(() => {
            expect(wrapperView).toBeTruthy();
            expect(textInput).toBeTruthy();
        });

        expect(textInput.props.value).toBe('example@gmail.com');
    });

    it('Renders icon beside the TextInput when icon name is passed as a prop', () => {

        const { getByTestId } = render(<MainInputField value='' icon='home' iconColor='red' iconSize={25} />);

        const icon = getByTestId('GoBackButton:MaterialIcons');
        expect(icon).toBeTruthy();
        expect(icon.props.color).toBe('red');
        expect(icon.props.size).toBe(25);
    });

    it('Renders eye-button to show or hide the input password', () => {

        const { getByTestId } = render(<MainInputField value='' secureTextEntry={true} iconSize={26} iconColor='blue' />);

        const eyeButton = getByTestId('MainInputField:ToggleEyeButton');
        const eyeIcon = getByTestId('GoBackButton:FontAwesome5');

        waitFor(() => {
            expect(eyeButton).toBeTruthy();
            expect(eyeIcon).toBeTruthy();
            expect(eyeIcon.props.size).toBe(26);
            expect(eyeIcon.props.color).toBe('blue');
        });

    });
});