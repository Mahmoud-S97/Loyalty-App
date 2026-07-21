import React, { JSX } from 'react';
import { FlatList, View } from 'react-native';
import SkeletonBox from '../../SkeletonBox';
import { is_RTL } from '@/utils';
import ScrollingView from '@/components/layout/screens/ScrollingView';

const SKELETON_VOUCHERS = [1, 2, 3];

const VoucherItemSkeleton = (): JSX.Element => {
  return (
    <View className='w-[280px] rounded-2xl border border-neutral-500 bg-neutral-100 px-4 py-10 dark:bg-secondary'>
      {/* Voucher Content */}
      <View className='flex-row items-center gap-4'>
        <View className='flex-1 gap-2'>
          <SkeletonBox className='h-5 w-3/4 rounded-md' />
          <SkeletonBox className='h-4 w-1/2 rounded-md' />
        </View>
      </View>

      {/* Redeem Button */}
      <SkeletonBox className='mt-5 h-10 w-full rounded-lg' />
    </View>
  );
};

const VouchersListSkeleton = (): JSX.Element => {
  return (
    <View className='w-full'>
      {/* Section Title */}
      <SkeletonBox className='mb-4 h-6 w-48 rounded-md' />

      <ScrollingView horizontal={true}>
        <View className='flex flex-row gap-4'>
          <VoucherItemSkeleton />
          <VoucherItemSkeleton />
        </View>
      </ScrollingView>
    </View>
  );
};

export default VouchersListSkeleton;
