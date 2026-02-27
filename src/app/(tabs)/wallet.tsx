import React, { JSX } from 'react';
import { Alert, FlatList, useColorScheme, View } from 'react-native';
import { router } from 'expo-router';
import AppText from '@/components/ui/content/AppText';
import WalletCard from '@/components/loyalty/wallet/WalletCard';
import ScreenView from '@/components/layout/screens/ScreenView';
import { walletData } from '@/dummy-data';
import WalletList from '@/components/loyalty/wallet/WalletList';


const WalletScreen = (): JSX.Element => {

  const scheme = useColorScheme();

  return (
    <ScreenView>
      <View className='flex w-full h-[70px] justify-center items-start bg-brand-500'>
        <AppText className='ms-4 font-trans font-[600px] text-xl text-accent'>app.your_wallet</AppText>
      </View>
      <WalletList walletData={walletData} />
    </ScreenView>
  )
}

export default WalletScreen;