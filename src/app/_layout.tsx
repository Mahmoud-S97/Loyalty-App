import './global.css';
import React, { JSX, useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useAppFonts } from '@/Hooks/typography/useAppFonts';
import { initAppLanguage } from '@/lib/localization';
import AnimatedSplashScreen from './AnimatedSplashScreen';
import { useColorScheme } from 'react-native';
import { APP_COLORS } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element {

  const scheme = useColorScheme();
  const [fontsLoaded] = useAppFonts();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    initAppLanguage();
    SplashScreen.hideAsync();
  }, []);

  if (!fontsLoaded || showSplash) {
    return <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-neutral-100 dark:bg-neutral-900' edges={['top']}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: scheme === 'dark' ? APP_COLORS.neutral[900] : APP_COLORS.neutral[100] } }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
