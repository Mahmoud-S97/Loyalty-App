import React, { JSX } from 'react';
import { View } from 'react-native';
import SkeletonBox from '../SkeletonBox';

const WalletCardSkeleton = (): JSX.Element => {
  return (
    <View className='w-full rounded-2xl border border-brand-200 dark:border-brand-500 bg-brand-100 dark:bg-brand-200 mb-10 overflow-hidden'>
      {/* Shop Cover Image */}
      <SkeletonBox className='w-full h-[150px] rounded-2xl' />

      {/* Card Content */}
      <View className='p-4'>
        {/* Shop Info + Voucher Counter */}
        <View className='flex-row justify-between items-start'>
          {/* Shop Details */}
          <View className='flex-1 mr-4'>
            {/* Shop Name */}
            <SkeletonBox className='w-3/4 h-5 rounded-md' />

            {/* Shop Description */}
            <SkeletonBox className='w-full h-4 rounded-md mt-3' />

            {/* Shop Address */}
            <SkeletonBox className='w-2/3 h-4 rounded-md mt-2' />
          </View>

          {/* Voucher Counter */}
          <SkeletonBox className='w-14 h-14 rounded-full' />
        </View>

        {/* Progress Bar */}
        <SkeletonBox className='w-full h-3 rounded-full mt-5' />

        {/* Progress Text + Reward */}
        <View className='w-full flex-row items-center mt-4 gap-6'>
          {/* 3/10 */}
          <SkeletonBox className='w-10 h-5 rounded-md' />

          {/* Earn 1 free haircut */}
          <SkeletonBox className='flex-1 h-5 rounded-md' />
        </View>
      </View>
    </View>
  );
};

export default WalletCardSkeleton;
