import { Text } from 'react-native';
import { render } from "@testing-library/react-native";
import ContainerView from '../ContainerView';

describe('<ContainerView />', () => {
    it('renders its children', () => {
        const { getByText } = render(
            <ContainerView>
                <Text>Hello ContainerView</Text>
            </ContainerView>
        );

        expect(getByText('Hello ContainerView')).toBeTruthy();
    });

    it('renders the root View', () => {
        const { getByTestId } = render(
            <ContainerView>
                <Text>Child</Text>
            </ContainerView>
        )

        expect(getByTestId('ContainerView:View')).toBeTruthy();

    });
});