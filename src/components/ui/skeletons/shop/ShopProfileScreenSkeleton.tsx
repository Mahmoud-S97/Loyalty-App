import React, { JSX } from 'react';
import { View } from 'react-native';

import ScrollingView from '@/components/layout/screens/ScrollingView';
import SkeletonBox from '../SkeletonBox';
import LoyaltyCardSkeleton from '../wallet/voucher-detail-screen/LoyaltyCardSkeleton';
import GoBackButton from '../../globals/buttons/GoBackButton';
import { APP_COLORS } from '@/constants/theme';

const LOYALTY_CARD_SKELETONS = [1];

const ShopProfileScreenSkeleton = (): JSX.Element => {
  return (
    <ScrollingView>
      {/* Cover Image */}
      <View className='relative h-[220px] w-full bg-neutral-200 dark:bg-neutral-700'>
        {/* Go Back Button */}
        <GoBackButton
          className='absolute top-4 left-4 bg-secondary/60'
          iconColor={APP_COLORS.neutral[200]}
        />
      </View>

      {/* Shop Information */}
      <View className='w-full items-start px-4 pb-2 pt-6'>
        {/* Logo + Shop Information */}
        <View className='w-full flex-row items-center gap-4'>
          {/* Shop Logo */}
          <SkeletonBox className='h-20 w-20 rounded-xl' />

          {/* Shop Name + Description + Address */}
          <View className='flex-1 gap-2'>
            {/* Shop Name */}
            <SkeletonBox className='h-6 w-3/4 rounded-md' />

            {/* Shop Description */}
            <SkeletonBox className='h-5 w-full rounded-md' />

            {/* Shop Address */}
            <SkeletonBox className='h-4 w-2/3 rounded-md' />
          </View>
        </View>

        {/* Full Shop Description */}
        <View className='flex flex-col gap-2 mt-6 w-full'>
          <SkeletonBox className='h-4 w-full rounded-md' />
          <SkeletonBox className='h-4 w-full rounded-md' />
          <SkeletonBox className='h-4 w-1/2 rounded-md' />
        </View>
      </View>

      {/* Loyalty Cards List */}
      <View className='mt-6 w-full gap-6 px-4'>
        {LOYALTY_CARD_SKELETONS.map((item) => (
          <LoyaltyCardSkeleton key={item} />
        ))}
      </View>
    </ScrollingView>
  );
};

export default ShopProfileScreenSkeleton;
