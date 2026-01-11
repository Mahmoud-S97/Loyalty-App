import { Text } from 'react-native';
import { render } from "@testing-library/react-native";
import ScrollingView from '../ScrollingView';

describe('<ScrollingView />', () => {
    it('Renders its children', () => {
        const { getByText } = render(
            <ScrollingView>
                <Text>Hello ScrollingView</Text>
            </ScrollingView>
        );

        expect(getByText('Hello ScrollingView')).toBeTruthy();
    });

    it('Renders the root View', () => {
        const { getByTestId } = render(
            <ScrollingView>
                <Text>Child</Text>
            </ScrollingView>
        )

        expect(getByTestId('ScrollingView:View')).toBeTruthy();

    });

    it('Combines style classes correctly', () => {
        const { getByTestId } = render(<ScrollingView className='bg-red-500'>
            <Text>Children</Text>
        </ScrollingView>)
        const scrollingView = getByTestId('ScrollingView:View');

        expect(scrollingView.props.className).toContain('bg-red-500');
    });

    it('Checks if Horizontal scroll-view being false by default', () => {
        const { getByTestId } = render(<ScrollingView horizontal={false}>
            <Text>Children</Text>
        </ScrollingView>)
        const scrollingView = getByTestId('ScrollingView:View');

        expect(scrollingView.props.horizontal).toBe(false);
    });

    it('Hides both scroll indicators by default', () => {
        const { getByTestId } = render(<ScrollingView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <Text>Children</Text>
        </ScrollingView>)
        const scrollingView = getByTestId('ScrollingView:View');

        expect(scrollingView.props.showsHorizontalScrollIndicator).toBe(false);
        expect(scrollingView.props.showsVerticalScrollIndicator).toBe(false);
    });
});