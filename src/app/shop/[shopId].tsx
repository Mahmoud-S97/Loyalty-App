import React, { JSX, useEffect } from 'react';
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
import { useShops } from '@/Hooks/shops/useShops';
import { useWallet } from '@/Hooks/wallet/useWallet';
import { useAuth } from '@/Hooks/auth/useAuth';
import { logger } from '@/lib/logger';
import { LoyaltyCardDto, UserWalletDto } from '@/types';

const ShopProfileScreen = (): JSX.Element => {
  const { shopId } = useLocalSearchParams<{ shopId?: string }>();
  const normalizedShopId = Array.isArray(shopId) ? shopId[0] : shopId
  const { user } = useAuth();
  const { shopData, isLoading } = useShops(normalizedShopId);
  console.log('ShopData:::: ', shopData);
  const {
    wallet,
    isLoading: isWalletLoading,
  } = useWallet(user?.uid);

  const selectedWalletItem = wallet.find((wallet) => wallet.shopId === normalizedShopId);

  const threshold = shopData?.threshold ?? 0;

  const loyaltyCardsList = selectedWalletItem?.loyaltyCards.filter(
    (card) => card.stamps < threshold || card.status === 'active'
  );

  if (isLoading || isWalletLoading) {
    return <ShopProfileScreenSkeleton />;
  }

  return (
    <ScrollingView>
      <View className='w-full h-[220px] relative'>
        <ImageBackground
          source={{ uri: shopData?.coverImage }}
          alt={shopData?.name}
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
        <View className='flex flex-row items-start gap-4'>
          <Image
            source={{ uri: shopData?.logo }}
            alt={shopData?.name}
            className='size-20 rounded-xl'
            resizeMode='cover'
          />
          <View className='flex-1 flex-col'>
            <AppText
              className='text-xl text-left text-neutral-900 dark:text-neutral-400'
              weight='bold'
            >
              {shopData?.name}
            </AppText>
            <AppText
              className='text-lg text-left text-neutral-900 dark:text-neutral-400'
              weight='medium'
            >
              {shopData?.specialties.join(', ')}
            </AppText>
            <AppText className='text-sm text-left text-neutral-700 dark:text-neutral-500'>
              {`${shopData?.address.address1}, ${shopData?.address.address2}, ${shopData?.address.postCode}`}
            </AppText>
          </View>
        </View>
        <AppText className='text-sm mt-4 text-left text-neutral-800 dark:text-neutral-400'>
          {shopData?.description}
        </AppText>
      </ContainerView>
      <LoyaltyCardList
        loyaltyCardsList={loyaltyCardsList}
        threshold={threshold}
        shopLogo={shopData?.logo}
      />
    </ScrollingView>
  );
};

export default ShopProfileScreen;
