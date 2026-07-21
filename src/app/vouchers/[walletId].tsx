import React, { JSX } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import ScreenView from '@/components/layout/screens/ScreenView';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import { useLocalSearchParams, router, RelativePathString } from 'expo-router';
import { USER_WALLET } from '@/dummy-data';
import { APP_COLORS } from '@/constants/theme';
import AppText from '@/components/ui/content/AppText';
import ContainerView from '@/components/layout/screens/ContainerView';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import VouchersList from '@/components/loyalty/vouchers/VouchersList';
import LoyaltyCardList from '@/components/loyalty/loyalty-cards/LoyaltyCardList';
import VoucherDetailScreenSkeleton from '@/components/ui/skeletons/wallet/voucher-detail-screen/VoucherDetailScreenSkeleton';

const VoucherDetailScreen = (): JSX.Element => {
  const { cardShadow } = useThemeStyles();
  const { walletId } = useLocalSearchParams();

  // Later will be handled through APIs call!
  const isLoading = false;

  const selectedWalletItem = USER_WALLET.find(
    (wallet) => wallet.id === walletId
  );
  const vouchersList = selectedWalletItem?.loyaltyCards?.filter(
    (voucher) => voucher.stamps >= selectedWalletItem.threshold
  );
  const loyaltyCardsList = selectedWalletItem?.loyaltyCards.filter(
    (card) => card.stamps < selectedWalletItem.threshold
  );

  const threshold = selectedWalletItem?.threshold ?? 0;
  const shopLogo = selectedWalletItem?.shopLogo;

  const onVisitShopHandler = (): void => {
    const path = `/shop/${selectedWalletItem?.shopId}` as RelativePathString;
    router.push(path);
  };

  if(isLoading) {
    return <VoucherDetailScreenSkeleton />
  }

  return (
    <ScreenView>
      <View className='w-full h-[220px] relative'>
        <ImageBackground
          source={{ uri: selectedWalletItem?.shopCoverImage }}
          resizeMode='cover'
          className='flex-1'
        >
          <GoBackButton
            className='bg-secondary/60'
            iconColor={APP_COLORS.neutral[200]}
          />
        </ImageBackground>
      </View>
      <ContainerView className='flex-0 relative pt-24'>
        <View
          style={[cardShadow, { borderWidth: 0.5 }]}
          className='w-full min-h-130 flex flex-col gap-4 px-4 py-6 border-neutral-500 dark:border-neutral-700 rounded-xl bg-neutral-100 dark:bg-secondary absolute -top-16 z-100'
        >
          <View className='w-full flex flex-row items-center gap-4'>
            <View className='flex items-center justify-center w-16 h-16'>
              <Image
                source={{ uri: selectedWalletItem?.shopLogo }}
                alt={selectedWalletItem?.shopName}
                resizeMode='cover'
                className='w-full h-full'
              />
            </View>
            <View className='flex-1 flex-col gap-1'>
              <AppText
                className='text-lg text-left text-neutral-900 dark:text-neutral-400'
                weight='semiBold'
              >
                {selectedWalletItem?.shopName}
              </AppText>
              <AppText numberOfLines={2} className='text-sm text-left text-neutral-700 dark:text-neutral-500'>
                {selectedWalletItem?.shopAddress}
              </AppText>
            </View>
          </View>
          <MainButton
            title='Visit Profile'
            className='h-10 bg-primary rounded-lg'
            textClassName='text-sm'
            onPress={onVisitShopHandler}
          />
        </View>
      </ContainerView>
      <ScrollingView>
        <VouchersList vouchersList={vouchersList} />
        <LoyaltyCardList
          loyaltyCardsList={loyaltyCardsList}
          threshold={threshold}
          shopLogo={shopLogo}
        />
      </ScrollingView>
    </ScreenView>
  );
};

export default VoucherDetailScreen;
