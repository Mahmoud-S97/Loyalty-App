import React, { JSX } from 'react';
import { View } from 'react-native';
import SkeletonBox from '../SkeletonBox';

const ShopCardSkeleton = (): JSX.Element => {
  return (
    <View className='w-full rounded-2xl border border-brand-200 dark:border-brand-500 bg-brand-100 dark:bg-brand-200 mb-10 overflow-hidden'>
      {/* Shop Cover Image */}
      <SkeletonBox className='w-full h-[150px] rounded-2xl' />

      {/* Card Content */}
      <View className='flex flex-col p-4'>
          {/* Shop Details */}
          <View className='flex-1 mr-2'>
            {/* Shop Name */}
            <SkeletonBox className='w-3/4 h-5 rounded-md' />

            {/* Shop Description */}
            <SkeletonBox className='w-full h-4 rounded-md mt-3' />

            {/* Shop Address */}
            <SkeletonBox className='w-2/3 h-4 rounded-md mt-2' />
            {/* Shop Status */}
          <SkeletonBox className='w-1/4 h-5 rounded-md mt-2' />
          </View>
      </View>
    </View>
  );
};

export default ShopCardSkeleton;
