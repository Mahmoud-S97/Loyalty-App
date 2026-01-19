import { render } from '@testing-library/react-native';

jest.mock('expo-router', () => {
    const React = require('react');
    const { View } = require('react-native');

    const Stack = ({ children }: any) => (
        <View testID='AuthLayout:Stack'>{children}</View>
    )

    Stack.Screen = ({ name }: any) => (
        <View testID={`AuthStack:Screen:${name}`} />
    )

    return { Stack };
});

import AuthLayout from '../_layout';

describe('<AuthLayout />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders AuthStack correctly', () => {

        const { getByTestId } = render(<AuthLayout />);

        // Check if AuthStack exists
        expect(getByTestId('AuthLayout:Stack')).toBeTruthy();
    });

    it('renders AuthStack screens correctly', () => {

        const { getByTestId } = render(<AuthLayout />);

        // Check if AuthStack Screens exist
        expect(getByTestId('AuthStack:Screen:intro')).toBeTruthy();
        expect(getByTestId('AuthStack:Screen:sign-up')).toBeTruthy();
        expect(getByTestId('AuthStack:Screen:forgot-password')).toBeTruthy();
        expect(getByTestId('AuthStack:Screen:reset-password')).toBeTruthy();
    });
});