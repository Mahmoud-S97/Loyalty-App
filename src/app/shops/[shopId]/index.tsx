import React, { JSX } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import { useLocalSearchParams } from 'expo-router';
import { walletData } from '@/dummy-data';
import { APP_COLORS } from '@/constants/theme';
import AppText from '@/components/ui/content/AppText';
import ContainerView from '@/components/layout/screens/ContainerView';
import { LOCAL_IMAGES } from '@/constants';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import VouchersList from '@/components/loyalty/vouchers/VouchersList';

const ShopDetailScreen = (): JSX.Element => {
  const { cardShadow } = useThemeStyles();
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
      <ContainerView className='relative pt-28'>
        <View
          style={[cardShadow, { borderWidth: 0.5 }]}
          className='w-full min-h-130 flex flex-col gap-4 px-4 py-6 border-neutral-500 dark:border-neutral-700 rounded-xl bg-neutral-100 dark:bg-secondary absolute -top-16 z-100'
        >
          <View className='w-full flex flex-row items-center gap-2'>
            <View className='flex items-center justify-center w-16 h-16'>
              <Image
                source={LOCAL_IMAGES.LOGO_TRANS}
                resizeMode='cover'
                className='w-full h-full'
              />
            </View>
            <View className='flex flex-col gap-1'>
              <AppText
                className='text-lg font-semibold text-neutral-900 dark:text-neutral-200'
                weight='semiBold'
              >
                {shopData?.name}
              </AppText>
              <AppText
                className='text-sm font-medium text-neutral-700 dark:text-neutral-200'
                weight='medium'
              >
                {shopData?.address}
              </AppText>
            </View>
          </View>
          <MainButton
            title='Visit Profile'
            className='h-10 bg-primary rounded-lg'
            textClassName='text-sm'
          />
        </View>
        <View className='w-full h-full'>
          <VouchersList />
        </View>
      </ContainerView>
    </ScrollingView>
  );
};

export default ShopDetailScreen;
