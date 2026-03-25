import React, { JSX } from 'react';
import ScreenView from '@/components/layout/screens/ScreenView';
import MainHeader from '@/components/layout/header/MainHeader';


const NotificationScreen = (): JSX.Element => {
  return (
    <ScreenView>
      <MainHeader withGoBackButton={true} textClassName='w-[80%] text-start' title='app.notifications' />
    </ScreenView>
  )
}

export default NotificationScreen;