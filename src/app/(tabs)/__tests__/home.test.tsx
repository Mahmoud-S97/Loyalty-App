import { render } from '@testing-library/react-native';
import HomeScreen from '../home';
import scanningAnimation from '@/assets/lottie/NFC-QR-Reader.json';

// Mock the rendered components which have their own unit-tests
jest.mock('@/components/ui/globals/buttons/MainButton');
jest.mock('@/components/ui/content/AppText');

jest.mock('@expo/vector-icons/FontAwesome', () => {
    const React = require('react');
    const { View } = require('react-native');

    return ({ name, size, color, testID }: { name: string, size: number, color: string, testID: string }) => (
        <View
            testID={testID}
            name={name}
            size={size}
            color={color}
        />
    )
});

jest.mock('lottie-react-native', () => {
    const React = require('react');
    const { View } = require('react-native');

    return ({ testID, ...props }: any) => (
        <View testID={testID} {...props} />
    )
});

// Mock the rendered screen-wrappers which have their own unit-tests
jest.mock('@/components/layout/screens/ScreenView', () => 'ScreenView');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');


describe('<HomeScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders Home-Screen correctly', () => {

        const { getByText, getByTestId } = render(<HomeScreen />);

        expect(getByText('app.scan_NFC_or_QR')).toBeTruthy();
        expect(getByTestId('HomeScreen:LottieViewWrapper')).toBeTruthy();
    });

    // Will be handled later, for now just asserting the existancy
    it('navigates to Notification-Screen when Notification-Button is pressed', () => {

        const { getByTestId } = render(<HomeScreen />);

        const notificationButton = getByTestId('HomeScreen:NotificationButton');

        expect(notificationButton).toBeTruthy();
    });

    it('renders Notification-Icon inside the Notification-Button', () => {

        const { getByTestId } = render(<HomeScreen />);

        const icon = getByTestId('HomeScreen:NotificationIcon');

        expect(icon).toBeTruthy();
    });

    it('uses bell icon for Notification-Button', () => {

        const { getByTestId } = render(<HomeScreen />);

        const icon = getByTestId('HomeScreen:NotificationIcon');

        expect(icon.props.name).toBe('bell-o');
        expect(icon.props.size).toBe(22);
    });

    it('renders LottieView correctly', () => {

        const { getByTestId } = render(<HomeScreen />);

        const lottieView = getByTestId('HomeScreen:LottieView');

        expect(lottieView.props.source).toBe(scanningAnimation);
        expect(lottieView.props.autoPlay).toBe(true);
        expect(lottieView.props.loop).toBe(true);
    });

    it('renders scanning-buttons wrapper correctly', () => {

        const { getByTestId } = render(<HomeScreen />);

        const scanningBtnsWrapper = getByTestId('HomeScreen:ScanningButtonsWrapper');

        expect(scanningBtnsWrapper).toBeTruthy();
        expect(scanningBtnsWrapper.children.length).toBe(2);
    });
});