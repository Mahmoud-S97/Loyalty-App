import { Text } from 'react-native';
import { render } from "@testing-library/react-native";
import ScreenView from '../ScreenView';

describe('<ScreenView />', () => {
    it('Renders its children', () => {
        const { getByText } = render(
            <ScreenView>
                <Text>Hello ScreenView</Text>
            </ScreenView>
        );

        expect(getByText('Hello ScreenView')).toBeTruthy();
    });

    it('Renders the root View', () => {
        const { getByTestId } = render(
            <ScreenView>
                <Text>Child</Text>
            </ScreenView>
        )

        expect(getByTestId('ScreenView:View')).toBeTruthy();

    });

    it('Combines style classes correctly', () => {
        const { getByTestId } = render(<ScreenView className='bg-red-500'>
            <Text>Children</Text>
        </ScreenView>)
        const screenView = getByTestId('ScreenView:View');

        expect(screenView.props.className).toContain('bg-red-500');
    });
});