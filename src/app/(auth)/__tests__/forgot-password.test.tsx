import { fireEvent, render } from '@testing-library/react-native';
import ForgotPasswordScreen from '../forgot-password';
import { router } from 'expo-router';

// Mock the rendered components which have their own unit-tests
jest.mock('@/components/ui/globals/buttons/GoBackButton');
jest.mock('@/components/ui/globals/buttons/MainButton');
jest.mock('@/components/ui/globals/inputFields/MainInputField');
jest.mock('@/components/ui/content/AppText');

// Mock the rendered screen-wrappers which have their own unit-tests
jest.mock('@/components/layout/screens/ScreenView', () => 'ScreenView');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');

describe('<ForgotPasswordScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders ForgotPasswordScreen correctly', () => {

        const { getByTestId } = render(<ForgotPasswordScreen />);

        expect(getByTestId('ForgotPasswordScreen:KeyboardAvoidingView')).toBeTruthy();
    });

    it('calls forgot password api and navigates to ResetPassword screen', () => {

        const {getByTestId} = render(<ForgotPasswordScreen />);

        const submitForgotPasswordBtn = getByTestId('ForogtPasswordScreen:SubmitBtn');

        fireEvent.press(submitForgotPasswordBtn);

        expect(router.navigate).toHaveBeenCalledWith('/reset-password');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    });
});