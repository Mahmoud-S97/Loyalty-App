import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../index';
import { LOCAL_IMAGES } from '@/constants/images';

/* -------------------------------------------------------------------------- */
/*                                   Mocks                                    */
/* -------------------------------------------------------------------------- */

jest.mock('@/components/layout/screens/ScrollingView', () => 'ScrollingView');
jest.mock('@/components/layout/screens/ContainerView', () => 'ContainerView');

jest.mock('@/components/ui/content/AppText');
jest.mock('@/components/ui/globals/buttons/GoBackButton');
jest.mock('@/components/ui/globals/inputFields/MainInputField');
jest.mock('@/components/ui/globals/buttons/MainButton');
jest.mock('@/components/loyalty/gender/GenderList', () => {
  const React = require('react');
  const { View } = require('react-native');

  return (props: any) => <View testID='ProfileScreen:GenderList' {...props} />;
});

describe('<ProfileScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders profile name', () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText('Mahmoud Al-Saleh')).toBeTruthy();
  });

  it('renders email address', () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText('example@gmail.com')).toBeTruthy();
  });

  it('renders field labels', () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText('auth.name')).toBeTruthy();
    expect(getByText('auth.email')).toBeTruthy();
    expect(getByText('app.date_of_birth')).toBeTruthy();
    expect(getByText('app.gender.gender_identity')).toBeTruthy();
  });

  it('renders logo image', () => {
    const { UNSAFE_getByType } = render(<ProfileScreen />);

    const image = UNSAFE_getByType(require('react-native').Image);

    expect(image.props.source).toBe(LOCAL_IMAGES.LOGO);
  });

  it('renders three MainInputFields', () => {
    const { UNSAFE_getAllByType } = render(<ProfileScreen />);

    const inputs = UNSAFE_getAllByType(
      require('@/components/ui/globals/inputFields/MainInputField').default
    );

    expect(inputs.length).toBe(3);
  });

  it('passes correct values to MainInputFields', () => {
    const { UNSAFE_getAllByType } = render(<ProfileScreen />);

    const inputs = UNSAFE_getAllByType(
      require('@/components/ui/globals/inputFields/MainInputField').default
    );

    expect(inputs[0].props.value).toBe('Mahmoud Saleh');

    expect(inputs[1].props.value).toBe('example@gmail.com');

    expect(inputs[2].props.value).toBe('1997/03/11');
  });

  it('renders GenderList', () => {
    const { getByTestId } = render(<ProfileScreen />);

    expect(getByTestId('ProfileScreen:GenderList')).toBeTruthy();
  });

  it('renders update button', () => {
    const { getByTestId } = render(<ProfileScreen />);

    expect(getByTestId('ProfileScreen:UpdateButton')).toBeTruthy();
  });

  it('renders GoBackButton', () => {
    const { getByTestId } = render(<ProfileScreen />);

    expect(getByTestId('ProfileScreen:GoBackButton')).toBeTruthy();
  });
});
