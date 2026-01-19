import { fireEvent, render } from '@testing-library/react-native';
import ResetPasswordScreen from '../reset-password';
import { router } from 'expo-router';

// Mock the rendered components which have their own unit-tests
jest.mock('@/components/ui/globals/buttons/GoBackButton');
jest.mock('@/components/ui/globals/buttons/MainButton');
jest.mock('@/components/ui/globals/inputFields/MainInputField');
jest.mock('@/components/ui/content/AppText');

// Mock the rendered screen-wrappers which have their own unit-tests
jest.mock('@/components/layout/screens/ScreenView', () => 'ScreenView');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');

describe('<ResetPasswordScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders ResetPasswordScreen correctly', () => {

        const { getByTestId } = render(<ResetPasswordScreen />);

        expect(getByTestId('ResetPasswordScreen:KeyboardAvoidingView')).toBeTruthy();
    });

    it('calls reset password api and navigates to login screen', () => {

        const {getByTestId} = render(<ResetPasswordScreen />);

        const resetPasswordBtn = getByTestId('ResetPasswordScreen:ResetPasswordBtn');

        fireEvent.press(resetPasswordBtn)

        expect(router.dismissAll).toHaveBeenCalledTimes(1);
        expect(router.replace).toHaveBeenCalledTimes(1);
    });
});