import { render } from '@testing-library/react-native';
import WalletScreen from '../wallet';

// Mock the rendered screen-wrappers which have their own unit-tests
jest.mock('@/components/layout/screens/ScreenView', () => 'ScreenView');
jest.mock('@/components/loyalty/wallet/WalletList', () => 'WalletList');

// Mock the rendered components which have their own unit-tests
jest.mock('@/components/ui/content/AppText');

describe('<WalletScreen />', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Wallet-Screen correctly', () => {

    const { getByTestId, getByText } = render(<WalletScreen />);

    expect(getByTestId('WalletScreen:HeaderView')).toBeTruthy();
    expect(getByText('app.your_wallet')).toBeTruthy();
  });

});