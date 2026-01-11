import { Text } from 'react-native';
import { render } from "@testing-library/react-native";
import ContainerView from '../ContainerView';

describe('<ContainerView />', () => {
    it('Renders its children', () => {
        const { getByText } = render(
            <ContainerView>
                <Text>Hello ContainerView</Text>
            </ContainerView>
        );

        expect(getByText('Hello ContainerView')).toBeTruthy();
    });

    it('Renders the root View', () => {
        const { getByTestId } = render(
            <ContainerView>
                <Text>Child</Text>
            </ContainerView>
        )

        expect(getByTestId('ContainerView:View')).toBeTruthy();

    });

    it('Combines style classes correctly', () => {
        const { getByTestId } = render(<ContainerView className='bg-red-500'>
            <Text>Children</Text>
        </ContainerView>)
        const containerView = getByTestId('ContainerView:View');

        expect(containerView.props.className).toContain('bg-red-500');
    });
});