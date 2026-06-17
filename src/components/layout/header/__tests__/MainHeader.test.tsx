import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import MainHeader from '../MainHeader';
import { getTranslated } from '@/lib/localization';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';

jest.mock('@/lib/localization', () => ({
  getTranslated: jest.fn()
}));

jest.mock('@/components/ui/globals/buttons/GoBackButton', () => 'GoBackButton');

describe('<MainHeader />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders translated title by default', () => {
    (getTranslated as jest.Mock).mockReturnValue('Translated Header');

    const { getByText } = render(<MainHeader title='header.title' />);

    expect(getTranslated).toHaveBeenCalledWith('header.title');

    expect(getByText('Translated Header')).toBeTruthy();
  });

  it('renders non-translated title when withTranslation is false', () => {
    const { getByText } = render(
      <MainHeader title='My Header' withTranslation={false} />
    );

    expect(getTranslated).not.toHaveBeenCalled();

    expect(getByText('My Header')).toBeTruthy();
  });

  it('renders title text', () => {
    const { getByTestId } = render(
      <MainHeader title='Test Header' withTranslation={false} />
    );

    expect(getByTestId('MainHeader:Text:Title')).toBeTruthy();
  });

  it('renders GoBackButton when enabled', () => {
    const { getByTestId } = render(<MainHeader withGoBackButton={true} />);

    expect(getByTestId('MainHeader:GoBackButton')).toBeTruthy();
  });

  it('renders startComponent', () => {
    const { getByTestId } = render(
      <MainHeader startComponent={<Text testID='StartComponent'>Start</Text>} />
    );

    expect(getByTestId('StartComponent')).toBeTruthy();
  });

  it('renders endComponent', () => {
    const { getByTestId } = render(
      <MainHeader endComponent={<Text testID='EndComponent'>End</Text>} />
    );

    expect(getByTestId('EndComponent')).toBeTruthy();
  });

  it('renders container', () => {
    const { getByTestId } = render(<MainHeader />);

    expect(getByTestId('MainHeader:View:Container')).toBeTruthy();
  });

  it('does not render title when title prop is missing', () => {
    const { queryByTestId } = render(<MainHeader />);

    expect(queryByTestId('MainHeader:Text:Title')).toBeNull();
  });
});
