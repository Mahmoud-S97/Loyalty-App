import { fireEvent, render } from '@testing-library/react-native';
import LoginScreen from "../login";
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

describe('<LoginScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders LoginScreen correctly', () => {

        const { getByTestId } = render(<LoginScreen />);

        expect(getByTestId('LoginScreen:KeyboardAvoidingView')).toBeTruthy();
    });

    it('navigates to Forgot Password screen', () => {

        const { getByTestId } = render(<LoginScreen />);

        const forgotPasswordButton = getByTestId('LoginScreen:ForgotPasswordBtn');

        fireEvent.press(forgotPasswordButton);

        expect(router.navigate).toHaveBeenCalledWith('/forgot-password');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    });

    it('logs in when Login button is clicked', async () => {

        const { getByTestId } = render(<LoginScreen />);

        const loginButton = getByTestId('LoginScreen:LoginBtn');

        fireEvent.press(loginButton);

        expect(router.navigate).toHaveBeenCalledWith('/home');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    });

    it('navigates to SignUp screen', async () => {

        const { getByTestId } = render(<LoginScreen />);

        const signUpButton = getByTestId('LoginScreen:SignUpBtn');

        fireEvent.press(signUpButton);

        expect(router.navigate).toHaveBeenCalledWith('/sign-up');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    });
})