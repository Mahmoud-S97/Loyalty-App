import './global.css';
import React, { JSX, useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useAppFonts } from '@/Hooks/typography/useAppFonts';
import { initAppLanguage } from '@/lib/localization';
import AnimatedSplashScreen from './AnimatedSplashScreen';
import { APP_COLORS } from '@/constants/theme';
import { AppThemeProvider } from '@/store/context/theme';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';

SplashScreen.preventAutoHideAsync();

const RenderApp = (): JSX.Element => {
  const { is_dark } = useAppTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className='flex-1 bg-neutral-100 dark:bg-neutral-900'
        edges={['top']}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: is_dark
                ? APP_COLORS.neutral[900]
                : APP_COLORS.neutral[100]
            }
          }}
        >
          <Stack.Screen name='(auth)' />
          <Stack.Screen name='(tabs)' />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default function RootLayout(): JSX.Element {
  const [fontsLoaded] = useAppFonts();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await initAppLanguage();
    })();
    SplashScreen.hideAsync();
  }, []);

  if (!fontsLoaded || showSplash) {
    return <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AppThemeProvider>
          <RenderApp />
        </AppThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
