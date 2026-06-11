import React, { JSX } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import { useLocalSearchParams } from 'expo-router';
import { walletData } from '@/dummy-data';
import { APP_COLORS } from '@/constants/theme';
import AppText from '@/components/ui/content/AppText';
import ContainerView from '@/components/layout/screens/ContainerView';
import LoyaltyCardList from '@/components/loyalty/loyalty-cards/LoyaltyCardList';

const ShopProfileScreen = (): JSX.Element => {
  const { shopId } = useLocalSearchParams();

  const shopData = walletData.find((shop) => shop.id === +shopId);

  return (
    <ScrollingView>
      <View className='w-full h-[220px] relative'>
        <ImageBackground
          source={shopData?.image}
          resizeMode='cover'
          className='flex-1'
        >
          <GoBackButton
            className='bg-secondary/60'
            iconColor={APP_COLORS.neutral[200]}
          />
        </ImageBackground>
      </View>
      <ContainerView className='items-start pb-2'>
        <View className='flex flex-row items-center gap-4'>
          <Image
            source={shopData?.image}
            className='size-16'
            resizeMode='cover'
          />
          <View className='flex flex-col gap-1'>
            <AppText
              className='text-xl font-semibold text-neutral-900 dark:text-neutral-400'
              weight='semiBold'
            >
              {shopData?.name}
            </AppText>
            <AppText
              className='text-md font-md text-neutral-900 dark:text-neutral-400'
              weight='medium'
            >
              {shopData?.title}
            </AppText>
            <AppText className='text-sm font-sm text-neutral-700 dark:text-neutral-500'>
              {shopData?.address}
            </AppText>
          </View>
        </View>
        <AppText className='text-sm mt-4 font-md text-neutral-800 dark:text-neutral-400'>
          {shopData?.description}
        </AppText>
      </ContainerView>
      <LoyaltyCardList />
    </ScrollingView>
  );
};

export default ShopProfileScreen;
