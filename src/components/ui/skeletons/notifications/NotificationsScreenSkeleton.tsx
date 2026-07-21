import React, { JSX } from 'react';
import { FlatList, View } from 'react-native';

import ScreenView from '@/components/layout/screens/ScreenView';
import MainHeader from '@/components/layout/navigation/header/MainHeader';
import SkeletonBox from '../SkeletonBox';

const NOTIFICATION_SKELETONS = [1, 2, 3, 4, 5];

const NotificationCardSkeleton = (): JSX.Element => {
  return (
    <View className='w-full min-h-100 px-4 py-6 border-b border-neutral-500 bg-neutral-50 dark:border-neutral-800 dark:bg-secondary'>
      <View className='w-full flex-row items-start justify-start gap-4'>
        {/* Notification Icon */}
        <View className='flex-1/2 items-center justify-center'>
          <SkeletonBox className='h-20 w-20 rounded-xl' />
        </View>

        {/* Notification Content */}
        <View className='flex-1 gap-2'>
          {/* Title */}
          <SkeletonBox className='h-5 w-3/4 rounded-md' />

          {/* Body */}
          <View className='mt-1 gap-2'>
            <SkeletonBox className='h-4 w-full rounded-md' />
            <SkeletonBox className='h-4 w-5/6 rounded-md' />
            <SkeletonBox className='h-4 w-2/3 rounded-md' />
          </View>

          {/* Created At */}
          <SkeletonBox className='mt-2 h-3 w-24 rounded-md' />
        </View>
      </View>
    </View>
  );
};

const NotificationsScreenSkeleton = (): JSX.Element => {
  return (
    <ScreenView className='bg-neutral-50 p-0 dark:bg-secondary'>
      {/* Header */}
      <MainHeader
        textClassName='text-left ps-6'
        title='app.notifications'
        endComponent={<SkeletonBox className='mr-4 h-8 w-20 rounded-md' />}
      />

      {/* Notifications List */}
      <FlatList
        data={NOTIFICATION_SKELETONS}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <NotificationCardSkeleton />}
        contentContainerClassName='pt-6 pb-24'
        showsVerticalScrollIndicator={false}
        windowSize={5}
        initialNumToRender={5}
        removeClippedSubviews
      />
    </ScreenView>
  );
};

export default NotificationsScreenSkeleton;
