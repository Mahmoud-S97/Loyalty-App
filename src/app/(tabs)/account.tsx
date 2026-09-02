import React, { JSX, useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import ContainerView from '@/components/layout/screens/ContainerView';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import { LOCAL_IMAGES } from '@/constants/images';
import AppText from '@/components/ui/content/AppText';
import { Ionicons } from '@expo/vector-icons';
import { APP_COLORS } from '@/constants/theme';
import { ACCOUNT_DETAILS } from '@/constants';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import { promptAlert } from '@/lib/alerts/promptAlert';
import { getTranslated } from '@/lib/localization';
import { is_RTL } from '@/utils';
import { authService } from '@/services/firebase/auth.service';
import { useUser } from '@/Hooks/user/useUser';
import Spinner from '@/components/ui/globals/Spinner';

const AccountScreen = (): JSX.Element => {
  const { currentThemeColor } = useAppTheme();
  const { userProfile, isProfileLoading } = useUser();

  const isPressed = useRef<boolean>(false);

  const handleRowNavigation = (route: string): void => {
    if (route === '/logout') {
      promptAlert(
        '',
        `${getTranslated('app.messages.user_logout_confirmation')} 😢`,
        [
          {
            style: 'destructive',
            text: getTranslated('common.yes'),
            onPress: userLogoutHandler
          },
          {
            style: 'default',
            text: getTranslated('common.no')
          }
        ]
      );
      return;
    }
    if (route !== '/profile' && route !== '/settings') return; // Currently supports /Profile & /Settings screens only!
    if (isPressed.current) return;
    isPressed.current = true;
    router.push(route as RelativePathString);
    setTimeout(() => (isPressed.current = false), 700);
  };

  const userLogoutHandler = async (): Promise<void> => {
    await authService.logout();
    router.replace('/login');
  };

  return (
    <>
      <ScrollingView className='bg-neutral-300 min-h-full'>
        <ContainerView className='items-start px-0 pb-40'>
          <View className='flex w-24 h-24 items-center justify-center relative self-center'>
          {userProfile?.photoURL ? (
            <View className='flex w-full h-full rounded-full items-center justify-center overflow-hidden'>
              <Image
                testID='ProfileScreen:Image:Logo'
                source={{ uri: userProfile?.photoURL }}
                className='w-full h-full'
                resizeMode='contain'
              />
            </View>
          ) : (
            <View className='flex w-full h-full rounded-full items-center justify-center bg-accent'>
              <AppText
                className='text-3xl text-neutral-900 dark:text-neutral-800'
                weight='semiBold'
              >
                {userProfile?.fullName.charAt(0)}
              </AppText>
            </View>
          )}
        </View>
          <AppText
            withTranslation={false}
            numberOfLines={2}
            className='text-xl mt-6 text-center self-center px-4'
            weight='semiBold'
          >
            {userProfile?.fullName}
          </AppText>
          <AppText
            withTranslation={false}
            numberOfLines={2}
            className='text-center self-center my-4 text-neutral-800'
          >
            {userProfile?.email}
          </AppText>
          {ACCOUNT_DETAILS.map((item: any, index: number) => (
            <View key={index} className='flex-1'>
              <AppText
                className='mt-10 mb-4 text-lg px-4 text-left'
                weight='medium'
              >
                {item.heading}
              </AppText>
              <View className='w-full bg-neutral-100 dark:bg-secondary gap-2'>
                {item.rows.map((row: any, index: number) => (
                  <TouchableOpacity
                    testID={`AccountScreen:TouchableOpacity:Row:${row.route}`}
                    key={index}
                    activeOpacity={0.7}
                    className='flex-row w-full h-14 py-1 px-4 items-center justify-between'
                    onPress={() => handleRowNavigation(row.route)}
                  >
                    <View className='flex-row gap-6 items-center'>
                      <AppIcon
                        type='Ionicons'
                        name={row.mainIcon}
                        size={24}
                        color={
                          row.route === '/logout'
                            ? APP_COLORS.danger
                            : currentThemeColor
                        }
                      />
                      <AppText
                        className={`text-lg ${row.route === '/logout' ? 'text-danger dark:text-danger' : ''}`}
                      >
                        {row.label}
                      </AppText>
                    </View>
                    <AppIcon
                      type='Ionicons'
                      name={is_RTL() ? 'chevron-back' : 'chevron-forward'}
                      size={24}
                      color={currentThemeColor}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ContainerView>
      </ScrollingView>
      {isProfileLoading && <Spinner />}
    </>
  );
};

export default AccountScreen;
