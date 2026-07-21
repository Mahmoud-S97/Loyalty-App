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
import ShopProfileScreenSkeleton from '@/components/ui/skeletons/shop/ShopProfileScreenSkeleton';

const ShopProfileScreen = (): JSX.Element => {
  const { shopId } = useLocalSearchParams();

  // Later will be handled through APIs call!
  const isLoading = false;

  const shopData = USER_WALLET.find((wallet) => wallet.shopId === shopId);
  const loyaltyCardsList = shopData?.loyaltyCards.filter(
    (card) => card.stamps < shopData.threshold
  );
  const threshold = shopData?.threshold ?? 0;
  const shopLogo = shopData?.shopLogo;

  if (isLoading) {
    return <ShopProfileScreenSkeleton />;
  }

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
            className='size-20 rounded-xl'
            resizeMode='cover'
          />
          <View className='flex-1 flex-col'>
            <AppText
              className='text-xl text-left text-neutral-900 dark:text-neutral-400'
              weight='bold'
            >
              {shopData?.shopName}
            </AppText>
            <AppText
              className='text-lg text-left text-neutral-900 dark:text-neutral-400'
              weight='medium'
            >
              {shopData?.shopDescription}
            </AppText>
            <AppText className='text-sm text-left text-neutral-700 dark:text-neutral-500'>
              {shopData?.shopAddress}
            </AppText>
          </View>
        </View>
        <AppText className='text-sm mt-4 text-left text-neutral-800 dark:text-neutral-400'>
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
