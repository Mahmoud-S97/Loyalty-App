import React, { JSX } from 'react';
import { FlatList, useColorScheme, View } from 'react-native';
import { router } from 'expo-router';
import AppText from '@/components/ui/content/AppText';
import WalletCard from '@/components/loyalty/wallet/WalletCard';
import ScreenView from '@/components/layout/screens/ScreenView';
import { WalletItem } from '@/types';

const barbershoMockImage = require('@/assets/images/app/mock/snipz-barbershop.jpeg');

type WalletItemTypes = {
  index: number,
  item: WalletItem
}

const walletData = [ // Dummy list
  {
    id: 1,
    name: 'Snipz Barbershop',
    title: 'Snpiz Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    points: 1,
    threshold: 10
  },
  {
    id: 2,
    name: 'Turkish Barbershop',
    title: 'Turkish Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    points: 3,
    threshold: 10
  },
  {
    id: 3,
    name: 'Crafton Barbershop',
    title: 'Crafton Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    points: 9,
    threshold: 10
  },
]

const WalletScreen = (): JSX.Element => {

  const scheme = useColorScheme();

  const renderWalletItem = ({ item, index }: WalletItemTypes) => {
    return (
      <WalletCard index={index} item={item} />
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