import { fireEvent, render } from '@testing-library/react-native';
import SignUpScreen from "../sign-up";
import { router } from 'expo-router';

// Mock the rendered components which have their own unit-tests
jest.mock('@/components/ui/globals/buttons/GoBackButton');
jest.mock('@/components/ui/globals/buttons/MainButton');
jest.mock('@/components/ui/globals/inputFields/MainInputField');
jest.mock('@/components/ui/content/AppText');

// Mock the rendered screen-wrappers which have their own unit-tests
jest.mock('@/components/layout/screens/ScrollingView', () => 'ScrollingView');
jest.mock('@/components/layout/screens/ScreenView', () => 'ScreenView');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');

describe('<SignUpScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders SignUpScreen correctly', () => {

        const { getByTestId } = render(<SignUpScreen />);

        expect(getByTestId('SignUpScreen:KeyboardAvoidingView')).toBeTruthy();
    });

    it('signs up when SignUp button is clicked', async () => {

        const { getByTestId } = render(<SignUpScreen />);

        const loginButton = getByTestId('SignUpScreen:SignUpBtn');

        fireEvent.press(loginButton);

        expect(router.navigate).toHaveBeenCalledWith('/home');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    });

    it('navigates to Login screen', async () => {

        const { getByTestId } = render(<SignUpScreen />);

        const loginButton = getByTestId('SignUpScreen:LoginBtn');

        fireEvent.press(loginButton);

        expect(router.navigate).toHaveBeenCalledWith('/login');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    });
})