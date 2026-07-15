import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import {
  Switch,
  TouchableOpacity,
  View,
  Text,
  I18nManager
} from 'react-native';
import { useColorScheme } from 'nativewind';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import * as Updates from 'expo-updates';
import MainHeader from '@/components/layout/navigation/header/MainHeader';
import AppText from '@/components/ui/content/AppText';
import ContainerView from '@/components/layout/screens/ContainerView';
import { ACCOUNT_SETTINGS, LOCAL_STORAGE_KEYS } from '@/constants';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import AppBottomSheet from '@/components/ui/modals/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useLocalStorage } from '@/Hooks/storage/useLocalStorage';
import i18n from '@/lib/localization/i18n';
import LanguageSelector from '@/components/ui/preferences/language/LanguageSelector';

type SettingsAction = 'language' | 'appearance';

const SettingsScreen = (): JSX.Element => {
  const { currentThemeColor, is_dark, toggleTheme } = useAppTheme();
  const { getStorageItem, setStorageItem } = useLocalStorage();

  const [settingsType, setSettingsType] = useState<SettingsAction | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'ar' | 'en'>('en');

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const onClickSettingsCard = useCallback((action: SettingsAction) => {
    if (action === 'appearance') return;

    if (action === 'language') {
      setSettingsType('language');
      setTimeout(() => bottomSheetRef.current?.present(), 50);
    }
  }, []);

  const getCurrentLang = async () => {
    const savedLang =
      (await getStorageItem(LOCAL_STORAGE_KEYS.APP_LANG)) || 'en';
    setSelectedLanguage(savedLang);
  };

  useEffect(() => {
    getCurrentLang();
  }, []);

  const switchLanguageHandler = async (lang: 'ar' | 'en'): Promise<any> => {
    const savedLang = await getStorageItem(LOCAL_STORAGE_KEYS.APP_LANG);

    const changedLang = savedLang === 'en' ? 'ar' : 'en';

    const isRTL = changedLang === 'ar';

    setSelectedLanguage(changedLang);
    await i18n.changeLanguage(changedLang);
    await setStorageItem(LOCAL_STORAGE_KEYS.APP_LANG, changedLang);

    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    bottomSheetRef.current?.dismiss();

    await Updates.reloadAsync();
  };

  return (
    <ScrollingView className='bg-neutral-50'>
      <MainHeader textClassName='text-start' title='app.settings' />
      <ContainerView className='px-0'>
        <View className='w-full bg-neutral-100 dark:bg-secondary gap-2'>
          {ACCOUNT_SETTINGS.map((row, index: number) => {
            return (
              <TouchableOpacity
                testID='SettingsScreen:TouchableOpacity'
                key={index}
                activeOpacity={row.cta === 'appearance' ? 1 : 0.7}
                className='flex-row w-full h-14 py-1 px-4 items-center justify-between'
                onPress={() => onClickSettingsCard(row.cta)}
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
                {row.cta === 'appearance' ? (
                  <Switch
                    testID='SettingsScreen:AppearanceSwitch'
                    value={is_dark}
                    onValueChange={toggleTheme}
                  />
                ) : (
                  <AppIcon
                    type='Ionicons'
                    name={row.arrowIcon}
                    size={24}
                    color={currentThemeColor}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <AppBottomSheet ref={bottomSheetRef}>
          {settingsType === 'language' && (
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              switchLanguageHandler={switchLanguageHandler}
            />
          )}
        </AppBottomSheet>
      </ContainerView>
    </ScrollingView>
  );
};

export default SettingsScreen;
