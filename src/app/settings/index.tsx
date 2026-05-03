import React, { JSX } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import MainHeader from '@/components/layout/header/MainHeader';
import AppText from '@/components/ui/content/AppText';
import ContainerView from '@/components/layout/screens/ContainerView';
import { ACCOUNT_SETTINGS } from '@/constants';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import AppIcon from '@/components/ui/globals/icons/AppIcon';

const SettingsScreen = (): JSX.Element => {
  const { currentThemeColor } = useAppTheme();

  return (
    <ScrollingView className='bg-neutral-50'>
      <MainHeader
        withGoBackButton={true}
        textClassName='text-start'
        title='app.settings'
      />
      <ContainerView className='px-0'>
        <View className='w-full bg-neutral-100 dark:bg-secondary gap-2'>
          {ACCOUNT_SETTINGS.map((row, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                className='flex-row w-full h-14 py-1 px-4 items-center justify-between'
                onPress={() => {}}
              >
                <View className='flex-row gap-6 items-center'>
                  <AppIcon
                    type={row.iconType}
                    name={row.iconName}
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
            );
          })}
        </View>
      </ContainerView>
    </ScrollingView>
  );
};

export default SettingsScreen;
