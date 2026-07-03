import React, { JSX } from 'react';
import ScreenView from '@/components/layout/screens/ScreenView';
import { USER_WALLET } from '@/dummy-data';
import WalletList from '@/components/loyalty/wallet/WalletList';
import MainHeader from '@/components/layout/navigation/header/MainHeader';


const WalletScreen = (): JSX.Element => {
  return (
    <ScreenView>
      <MainHeader withGoBackButton={false} title='app.your_wallet' className='bg-brand-400' textClassName='w-full text-start' />
      <WalletList userWallet={USER_WALLET} />
    </ScreenView>
  )
}

export default WalletScreen;