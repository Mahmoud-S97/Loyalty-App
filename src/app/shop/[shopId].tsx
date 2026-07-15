import React, { JSX } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import { useLocalSearchParams } from 'expo-router';
import { USER_WALLET } from '@/dummy-data';
import { APP_COLORS } from '@/constants/theme';
import AppText from '@/components/ui/content/AppText';
import ContainerView from '@/components/layout/screens/ContainerView';
import LoyaltyCardList from '@/components/loyalty/loyalty-cards/LoyaltyCardList';

const ShopProfileScreen = (): JSX.Element => {
  const { shopId } = useLocalSearchParams();

  const shopData = USER_WALLET.find((wallet) => wallet.shopId === shopId);
  const loyaltyCardsList = shopData?.loyaltyCards.filter(
    (card) => card.stamps < shopData.threshold
  );
  const threshold = shopData?.threshold ?? 0;
  const shopLogo = shopData?.shopLogo;

  return (
    <ScrollingView>
      <View className='w-full h-[220px] relative'>
        <ImageBackground
          source={{ uri: shopData?.shopCoverImage }}
          alt={shopData?.shopName}
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
            source={{ uri: shopData?.shopLogo }}
            alt={shopData?.shopName}
            className='size-16 rounded-xl'
            resizeMode='cover'
          />
          <View className='flex flex-col gap-1'>
            <AppText
              className='text-lg text-neutral-900 dark:text-neutral-400'
              weight='semiBold'
            >
              {shopData?.shopName}
            </AppText>
            <AppText
              className='text-md text-neutral-900 dark:text-neutral-400'
              weight='medium'
            >
              {shopData?.shopDescription}
            </AppText>
            <AppText className='text-sm text-neutral-700 dark:text-neutral-500'>
              {shopData?.shopAddress}
            </AppText>
          </View>
        </View>
        <AppText className='text-sm mt-4 text-neutral-800 dark:text-neutral-400'>
          {shopData?.shopDescription}
        </AppText>
      </ContainerView>
      <LoyaltyCardList
        loyaltyCardsList={loyaltyCardsList}
        threshold={threshold}
        shopLogo={shopLogo}
      />
    </ScrollingView>
  );
};

export default ShopProfileScreen;
