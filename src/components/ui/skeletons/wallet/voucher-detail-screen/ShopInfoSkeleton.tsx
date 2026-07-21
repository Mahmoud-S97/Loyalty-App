import React, { JSX } from 'react';
import { View } from 'react-native';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import SkeletonBox from '../../SkeletonBox';

const ShopInfoSkeleton = (): JSX.Element => {
  const { cardShadow } = useThemeStyles();

  return (
    <View
      style={[cardShadow, { borderWidth: 0.5 }]}
      className='absolute left-4 right-4 -top-16 z-100 min-h-130 rounded-xl border-neutral-500 bg-neutral-100 px-4 py-6 dark:border-neutral-700 dark:bg-secondary'
    >
      {/* Shop information */}
      <View className='w-full flex-row items-center gap-4'>
        {/* Shop Logo */}
        <SkeletonBox className='h-16 w-16 rounded-lg' />

        {/* Shop Name + Address */}
        <View className='flex-1 gap-2'>
          <SkeletonBox className='h-5 w-3/4 rounded-md' />

          <SkeletonBox className='h-4 w-full rounded-md' />

          <SkeletonBox className='h-4 w-2/3 rounded-md' />
        </View>
      </View>

      {/* Visit Profile */}
      <SkeletonBox className='h-6 mt-4 w-full rounded-lg' />
    </View>
  );
};

export default ShopInfoSkeleton;
