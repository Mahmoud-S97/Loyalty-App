
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import AppText from "../AppText";

jest.mock('@/lib/localization', () => ({
    getTranslated: jest.fn()
}));

import { getTranslated } from '@/lib/localization';

describe('<AppText />', () => {

    it('renders translated text', () => {

        (getTranslated as jest.Mock).mockReturnValue('Welcome to BESTIE Loyalty App');

        const { getByText } = render(<AppText>
            welcome
        </AppText>);

        expect(getTranslated).toHaveBeenCalledWith('welcome');
        expect(getByText('Welcome to BESTIE Loyalty App')).toBeTruthy();
    });
});