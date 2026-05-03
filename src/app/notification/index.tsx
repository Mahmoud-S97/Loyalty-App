import React, { JSX, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import ScreenView from '@/components/layout/screens/ScreenView';
import MainHeader from '@/components/layout/header/MainHeader';
import NotificationList from '@/components/loyalty/notification/NotificationList';
import { notificationData } from '@/dummy-data';
import AppText from '@/components/ui/content/AppText';


const NotificationScreen = (): JSX.Element => {

  const RenderHeaderEndComponent = (): ReactNode => {
    return (
      <TouchableOpacity activeOpacity={0.7} className='px-4 py-2 rounded-md'>
        <AppText className='text-red-500 dark:text-red-700 font-semibold' weight='semiBold'>app.clear_all</AppText>
      </TouchableOpacity>
    )
  }

  return (
    <ScreenView className='p-0 bg-neutral-50'>
      <MainHeader withGoBackButton={true} textClassName='text-start ps-6' title='app.notifications' endComponent={RenderHeaderEndComponent()} />
      <NotificationList notificationData={notificationData} />
    </ScreenView>
  )
}

export default NotificationScreen;