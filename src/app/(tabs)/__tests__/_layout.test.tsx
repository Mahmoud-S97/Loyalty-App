import React from 'react';
import { render } from '@testing-library/react-native';

type TabsComponent = React.FC<any> & {
    Screen?: React.FC<any>
}

jest.mock('expo-router', () => {
    const React = require('react');
    const { View } = require('react-native');

    const Tabs: TabsComponent = ({ children }: any) => (
        <View testID='TabsLayout:Tabs'>{children}</View>
    )

    Tabs.Screen = ({ name }: any) => (
        <View testID={`TabsLayout:Tabs:Screen:${name}`} name={name} />
    )

    return { Tabs };
});

import TabsLayout from '../_layout';

describe('<TabsLayout />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders TabsLayout correctly', () => {

        const { getByTestId } = render(<TabsLayout />);

        // Check if TabsLayout exists
        expect(getByTestId('TabsLayout:Tabs')).toBeTruthy();
    });

    it('renders TabsLayout screens correctly', () => {

        const { getByTestId } = render(<TabsLayout />);

        // Check if TabsLayout Screens exist
        expect(getByTestId('TabsLayout:Tabs:Screen:home')).toBeTruthy();
        expect(getByTestId('TabsLayout:Tabs:Screen:wallet')).toBeTruthy();
        expect(getByTestId('TabsLayout:Tabs:Screen:account')).toBeTruthy();
    });
})