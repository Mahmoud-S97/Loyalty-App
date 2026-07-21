import React, { JSX } from 'react';
import { View } from 'react-native';
import ScreenView from '@/components/layout/screens/ScreenView';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import { APP_COLORS } from '@/constants/theme';
import VoucherDetailHeaderSkeleton from './VoucherDetailHeaderSkeleton';
import ShopInfoSkeleton from './ShopInfoSkeleton';
import VoucherItemSkeleton from './VoucherListSkeleton';
import LoyaltyCardSkeleton from './LoyaltyCardSkeleton';
import SkeletonBox from '../../SkeletonBox';

const VoucherDetailScreenSkeleton = (): JSX.Element => {
  return (
    <ScreenView>
      {/* Header */}
      <View className='w-full h-[220px] relative'>
        <VoucherDetailHeaderSkeleton />

        <GoBackButton
          className='absolute top-4 left-4 bg-secondary/60'
          iconColor={APP_COLORS.neutral[200]}
        />
      </View>

      {/* Floating Shop Info */}
      <View className='flex-0 relative pt-24 px-4'>
        <ShopInfoSkeleton />
      </View>

      {/* Scrollable Content */}
      <ScrollingView>
        <View className='flex-1 pb-16'>
          {/* Redeemable Vouchers Section */}
          <View className='px-4 mt-8'>
            <VoucherItemSkeleton />
          </View>

          {/* Loyalty Cards Section */}
          <View className='px-4 mt-6'>
            {/* Section Title */}
            <SkeletonBox className='mb-4 h-6 w-48 rounded-md' />

            <LoyaltyCardSkeleton />
          </View>
        </View>
      </ScrollingView>
    </ScreenView>
  );
};

export default VoucherDetailScreenSkeleton;
