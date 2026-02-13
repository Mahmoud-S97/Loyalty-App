import React, { JSX } from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { router } from 'expo-router';
import ScreenView from '@/components/layout/screens/ScreenView';
import ContainerView from '@/components/layout/screens/ContainerView';
import LottieView from 'lottie-react-native';
import { getScreenWidth } from '@/utils';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import AppText from '@/components/ui/content/AppText';
import { APP_COLORS, shadowStyle } from '@/constants/theme';
import scanningAnimation from '../../assets/lottie/NFC-QR-Reader.json';
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = getScreenWidth();

const HomeScreen = (): JSX.Element => {

  const scheme = useColorScheme();

  return (
    <ScreenView>
      <TouchableOpacity activeOpacity={0.8} style={shadowStyle(scheme)} className='w-[50px] h-[50px] m-5 flex absolute z-10 justify-center items-center self-end rounded-full bg-neutral-50 dark:bg-neutral-800' onPress={() => { }}>
        <FontAwesome name='bell-o' size={22} color={scheme === 'dark' ? APP_COLORS.neutral[200] : APP_COLORS.neutral[900]} />
        <View className='w-[25px] h-[25px] bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -end-2'>
          <Text className='text-neutral-50 font-bold text-xs'>1</Text>
        </View>
      </TouchableOpacity>
      <ContainerView>
        <View className='flex justify-center items-center -mt-20'>
          <LottieView
            source={scanningAnimation}
            autoPlay
            loop={true}
            style={{
              width: screenWidth / 1.4,
              height: 250,
              transform: [{ scale: 1.5 }]
            }}
          />
        </View>
        <AppText className='text-center font-trans font-medium text-lg my-2'>app.scan_NFC_or_QR</AppText>
        <View className='flex-column gap-4 w-[70%] self-center mt-10'>
          <MainButton className='w-full bg-primary dark:bg-brand-800' title='app.tap_NFC_tag' icon='nfc' iconColor={APP_COLORS.neutral[400]} />
          <MainButton className='w-full bg-primary dark:bg-brand-800' title='app.scan_QR' icon='qr-code' iconColor={APP_COLORS.neutral[400]} />
        </View>
      </ContainerView>
    </ScreenView>
  )
}

export default HomeScreen;