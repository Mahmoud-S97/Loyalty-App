import React, { JSX } from 'react';
import { Alert, FlatList, useColorScheme, View } from 'react-native';
import { router } from 'expo-router';
import AppText from '@/components/ui/content/AppText';
import WalletCard from '@/components/loyalty/wallet/WalletCard';
import ScreenView from '@/components/layout/screens/ScreenView';
import { WalletItem } from '@/types';
import { walletData } from '@/dummy-data';


type WalletItemTypes = {
  index: number,
  item: WalletItem
}

const WalletScreen = (): JSX.Element => {

  const scheme = useColorScheme();

  const navigationHandler = () => {
    // Will be handled later
    Alert.alert('', 'Navigate to Loyalty-Screen!');
  }

  const renderWalletItem = ({ item, index }: WalletItemTypes) => {
    return (
      <WalletCard index={index} item={item} onPress={navigationHandler} />
    )
  }

  return (
    <ScreenView>
      <View className='flex w-full h-[70px] justify-center items-start bg-brand-500'>
        <AppText className='ms-4 font-trans font-[600px] text-xl text-accent'>app.your_wallet</AppText>
      </View>
      <FlatList
        data={walletData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWalletItem}
        contentContainerClassName='px-4 pt-6 pb-24'
        showsVerticalScrollIndicator={false}
        windowSize={5}
        initialNumToRender={10}
        removeClippedSubviews
      />
    </ScreenView>
  )
}

export default WalletScreen;