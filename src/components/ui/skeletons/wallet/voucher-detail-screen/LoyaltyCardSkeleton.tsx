import React, { JSX } from 'react';
import { View } from 'react-native';
import SkeletonBox from '../../SkeletonBox';

const LoyaltyCardSkeleton = (): JSX.Element => {
  return (
    <View className='w-full p-5 rounded-2xl border border-neutral-500 bg-neutral-100 dark:bg-secondary'>
      <View className='flex flex-row gap-4'>
        {/* Shop Logo */}
        <SkeletonBox className='w-16 h-16 rounded-full self-center' />

        {/* Title */}
        <SkeletonBox className='w-2/3 h-5 rounded-md self-center mt-4' />
      </View>

      {/* Stamp Icons */}
      <View className='flex-row flex-wrap justify-center gap-6 mt-6'>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonBox key={index} className='w-12 h-12 rounded-full' />
        ))}
      </View>
    </View>
  );
};

export default LoyaltyCardSkeleton;
