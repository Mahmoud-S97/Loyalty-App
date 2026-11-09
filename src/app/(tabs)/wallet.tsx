import React, { JSX, useEffect } from 'react';
import ScreenView from '@/components/layout/screens/ScreenView';
import { USER_WALLET } from '@/dummy-data';
import WalletList from '@/components/loyalty/wallet/WalletList';
import MainHeader from '@/components/layout/navigation/header/MainHeader';
import WalletListSkeleton from '@/components/ui/skeletons/wallet/WalletListSkeleton';
import { userWalletService } from '@/services/firebase/userWallet.service';
import { useWallet } from '@/Hooks/wallet/useWallet';
import { logger } from '@/lib/logger';

const WalletScreen = (): JSX.Element => {
  const { wallet, refreshWallet, isLoading } = useWallet();

  logger.log('WALLET::: ', wallet);

  return (
    <ScreenView>
      <MainHeader
        withGoBackButton={false}
        title='app.your_wallet'
        className='bg-brand-400'
        textClassName='w-full text-left'
      />
      {isLoading ? (
        <WalletListSkeleton />
      ) : (
        <WalletList
          userWallet={wallet}
          onRefresh={refreshWallet}
          isRefreshing={isLoading}
        />
      )}
    </ScreenView>
  );
};

export default WalletScreen;
