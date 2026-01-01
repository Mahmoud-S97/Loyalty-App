import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { JSX, useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAppFonts } from '../Hooks/typography/useAppFonts';
import { initAppLanguage } from '../lib/localization';
import AnimatedSplashScreen from './AnimatedSplashScreen';
import './global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element {

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
      <SafeAreaView className='flex-1' edges={['top', 'bottom']}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
