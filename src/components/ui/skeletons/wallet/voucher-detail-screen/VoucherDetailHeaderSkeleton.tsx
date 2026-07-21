import React, { JSX } from 'react';
import { View } from 'react-native';
import SkeletonBox from '../../SkeletonBox';

const VoucherDetailHeaderSkeleton = (): JSX.Element => {
  return (
    <View className='w-full h-[220px] bg-secondary/20'>
      <SkeletonBox className='flex-1 rounded-none' />
    </View>
  );
};

export default VoucherDetailHeaderSkeleton;
