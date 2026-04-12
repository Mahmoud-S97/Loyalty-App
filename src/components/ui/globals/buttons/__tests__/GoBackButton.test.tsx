import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { createMockTheme } from '@/utils/test-utils';

const mockBack = jest.fn();
const mockCanGoBack = jest.fn();
const mockUseColorScheme = jest.fn();
const mockUseAppTheme = useAppTheme as jest.Mock;

jest.mock('expo-router', () => ({
    useRouter: () => ({
        back: mockBack,
        canGoBack: mockCanGoBack
    })
}));


jest.mock('@/Hooks/theme/useAppTheme', () => ({
  useAppTheme: jest.fn(),
}));

mockUseAppTheme.mockReturnValue(createMockTheme());


jest.mock('@expo/vector-icons/FontAwesome5', () => {
    const React = require('react');
    const { View } = require('react-native');

    return ({ name, size, color }: { name: string, size: number, color: string }) => (
        <View
            testID='GoBackButton:Fontawesome5'
            name={name}
            size={size}
            color={color}
        />
    )
});


import { useRouter } from 'expo-router';
import GoBackButton from '../GoBackButton';
import { APP_COLORS } from '@/constants/theme';

describe('<GoBackButton />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Renders nothing if router cannot go back', () => {

        mockCanGoBack.mockReturnValue(false);

        const { queryByTestId } = render(<GoBackButton />);

        expect(queryByTestId('GoBackButton:Button')).toBeNull();

    });

    it('Renders back-button when router can go back', () => {

        mockCanGoBack.mockReturnValue(true);

        const { getByTestId } = render(<GoBackButton />);

        expect(getByTestId('GoBackButton:Button')).toBeTruthy();

    });

    it('Calls router.back() when pressed (default behavior)', () => {

        mockCanGoBack.mockReturnValue(true);

        const { getByTestId } = render(<GoBackButton />);

        fireEvent.press(getByTestId('GoBackButton:Button'));

        expect(mockBack).toHaveBeenCalledTimes(1);
    });

    it('Calls custom onPress when provided', () => {

        mockCanGoBack.mockReturnValue(true);
        const onPress = jest.fn();

        const { getByTestId } = render(<GoBackButton onPress={onPress} />);

        fireEvent.press(getByTestId('GoBackButton:Button'));

        expect(onPress).toHaveBeenCalledTimes(1);
        expect(mockBack).not.toHaveBeenCalled();
    });

    it('Passes icon size and color props correctly', () => {

        mockCanGoBack.mockReturnValue(true);

        const { getByTestId } = render(<GoBackButton iconSize={25} iconColor='red' />);

        const icon = getByTestId('GoBackButton:Fontawesome5');

        expect(icon.props.size).toBe(25);
        expect(icon.props.color).toBe('red');
    });

    it('Uses light-mode default icon color when no color is provided', () => {

        mockCanGoBack.mockReturnValue(true);
        mockUseAppTheme.mockReturnValue(createMockTheme({ theme: 'light', is_dark: false, currentThemeColor:APP_COLORS.neutral[900] })) // Test light-mode

        const { getByTestId } = render(<GoBackButton />);

        const icon = getByTestId('GoBackButton:Fontawesome5');

        expect(icon.props.color).toBe(APP_COLORS.neutral[900]);

    });

    it('Uses dark-mode default icon color when no color is provided', () => {

        mockCanGoBack.mockReturnValue(true);
        mockUseAppTheme.mockReturnValue(createMockTheme({ theme: 'dark', is_dark: true, currentThemeColor:APP_COLORS.neutral[200] })) // Test dark-mode

        const { getByTestId } = render(<GoBackButton />);

        const icon = getByTestId('GoBackButton:Fontawesome5');

        expect(icon.props.color).toBe(APP_COLORS.neutral[200]);
    });
});