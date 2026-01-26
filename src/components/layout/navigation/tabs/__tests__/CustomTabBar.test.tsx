
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CustomTabBar from '../CustomTabBar';

jest.mock('@expo/vector-icons');


const routes = [
    { key: 'home-key', name: 'home' },
    { key: 'account-key', name: 'account' },
    { key: 'wallet-key', name: 'wallet' },
]

const mockTabBarProps = {
    state: {
        index: 0,
        routes
    },
    navigation: {
        navigate: jest.fn(),
        emit: jest.fn()
    },
    descriptors: Object.fromEntries(
        routes.map(route => [
            route.key, { options: {} }
        ])
    ),
    insets: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

describe('<CustomTabBar />', () => {

    it('renders CutomTabBar correctly', () => {

        const { getByTestId } = render(<CustomTabBar {...mockTabBarProps as any} />);

        expect(getByTestId('CustomTabBar:View')).toBeTruthy();
        expect(getByTestId('CustomTabBar:View').props.children.length).toBe(3);
    });

    it('renders tabs correctly', () => {

        const { getByTestId } = render(<CustomTabBar {...mockTabBarProps as any} />);

        expect(getByTestId('CustomTabBar:ContainerView').props.children.length).toBe(mockTabBarProps.state.routes.length);
    });

    it('navigates to a specific screen when tab is pressed', () => {

        const { getByTestId } = render(<CustomTabBar {...mockTabBarProps as any} />);

        const tabButton = getByTestId('CustomTabBar:Tab-account');

        fireEvent.press(tabButton);

        expect(mockTabBarProps['navigation'].navigate).toHaveBeenCalledWith('account');
        expect(mockTabBarProps['navigation'].navigate).toHaveBeenCalledTimes(1);
    });

    it('navigates to Home screen when Circle-Button is pressed', () => {

        const { getByTestId } = render(<CustomTabBar {...mockTabBarProps as any} />);

        const circleButton = getByTestId('CustomTabBar:CircleButton');

        fireEvent.press(circleButton);

        expect(mockTabBarProps['navigation'].navigate).toHaveBeenCalledWith('home');
        expect(mockTabBarProps['navigation'].navigate).toHaveBeenCalledTimes(1);
    });
});