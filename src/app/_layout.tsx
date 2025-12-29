import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AnimatedSplashScreen from './AnimatedSplashScreen';
import './global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (showSplash) {
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
