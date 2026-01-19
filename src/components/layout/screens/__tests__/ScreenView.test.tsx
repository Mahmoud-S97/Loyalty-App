import { Text } from 'react-native';
import { render } from "@testing-library/react-native";
import ScreenView from '../ScreenView';

describe('<ScreenView />', () => {
    it('renders its children', () => {
        const { getByText } = render(
            <ScreenView>
                <Text>Hello ScreenView</Text>
            </ScreenView>
        );

        expect(getByText('Hello ScreenView')).toBeTruthy();
    });

    it('renders the root View', () => {
        const { getByTestId } = render(
            <ScreenView>
                <Text>Child</Text>
            </ScreenView>
        )

        expect(getByTestId('ScreenView:View')).toBeTruthy();

    });
});