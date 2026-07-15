import React, { JSX } from 'react';
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

const AccountScreen = (): JSX.Element => {
  const { currentThemeColor } = useAppTheme();

  const handleRowNavigation = (route: string): void => {
    if (route !== '/profile' && route !== '/settings') return; // Currently supports /Profile & /Settings screens only!
    router.push(route as RelativePathString);
  };

  return (
    <ScrollingView className='bg-neutral-300'>
      <ContainerView className='items-start px-0'>
        <View className='w-24 h-24 rounded-full overflow-hidden self-center'>
          <Image
            source={LOCAL_IMAGES.LOGO}
            className='w-full h-full'
            resizeMode='contain'
          />
        </View>
        <AppText
          withTranslation={false}
          numberOfLines={2}
          className='text-xl mt-6 text-center self-center px-4'
          weight='semiBold'
        >
          Mahmoud Al-Saleh - محمود الصالح
        </AppText>
        <AppText
          withTranslation={false}
          numberOfLines={2}
          className='text-center self-center my-4 text-neutral-800'
        >
          example@gmail.com
        </AppText>
        {ACCOUNT_DETAILS.map((item: any, index: number) => (
          <View key={index} className='flex-1'>
            <AppText className='mt-10 mb-4 text-lg px-4 text-left' weight='medium'>
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
                      color={currentThemeColor}
                    />
                    <AppText className='text-lg'>{row.label}</AppText>
                  </View>
                  <AppIcon
                  type='Ionicons'
                    name={row.arrowIcon}
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
  );
};

export default AccountScreen;
