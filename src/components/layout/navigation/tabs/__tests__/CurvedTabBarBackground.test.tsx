
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { CurvedTabBarBackground } from '../CurvedTabBarBackground';


describe('<CurvedTabBarBackground />', () => {

    it('renders CurvedTabBarBackground correctly', () => {

        const { getByTestId } = render(<CurvedTabBarBackground />);

        expect(getByTestId('CurvedTabBarBackground:Svg')).toBeTruthy();
    });
});