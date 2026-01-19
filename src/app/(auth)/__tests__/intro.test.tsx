import { fireEvent, render } from '@testing-library/react-native';
import LoginScreen from "../login";
import { router } from 'expo-router';
import IntroScreen from '../intro';
import { LOCAL_IMAGES } from '@/constants/images';

// Mock the rendered components which have their own unit-tests
jest.mock('@/components/ui/globals/buttons/MainButton');
jest.mock('@/components/ui/content/AppText');

// Mock the rendered screen-wrappers which have their own unit-tests
jest.mock('@/components/layout/screens/ScrollingView', () => 'ScrollingView');
jest.mock('@/components/layout/screens/ScreenView', () => 'ScreenView');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');

describe('<IntroScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders HeroSection correctly', () => {

        const { getByTestId } = render(<IntroScreen />);

        expect(getByTestId('IntroScreen:HeroSection')).toBeTruthy();
        expect(getByTestId('IntroScreen:HeroSection').props.children.length).toBe(2);
    });

    it('renders Logo-Image correctly', () => {

        const { getByTestId } = render(<IntroScreen />);

        const logoImage = getByTestId('IntroScreen:LogoImage');

        expect(logoImage.props.source).toBe(LOCAL_IMAGES.LOGO_TRANS);
    });

    it('renders NavigationSection correctly', () => {

        const { getByTestId } = render(<IntroScreen />);

        expect(getByTestId('IntroScreen:NavigationSection')).toBeTruthy();
        expect(getByTestId('IntroScreen:NavigationSection').props.children.length).toBe(4);
    });

    it('navigates to Login screen', () => {

        const { getByTestId } = render(<IntroScreen />);

        const loginBtn = getByTestId('IntroScreen:LoginBtn');

        fireEvent.press(loginBtn);

        expect(router.replace).toHaveBeenCalledWith('/login');
        expect(router.replace).toHaveBeenCalledTimes(1);
    });

    it('navigates to SignUp screen', () => {

        const { getByTestId } = render(<IntroScreen />);

        const signUpBtn = getByTestId('IntroScreen:SignUpBtn');

        fireEvent.press(signUpBtn);

        expect(router.replace).toHaveBeenCalledWith('/sign-up');
        expect(router.replace).toHaveBeenCalledTimes(1);
    });
});