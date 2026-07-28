import React, { JSX } from 'react';
import {
  Alert,
  I18nManager,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import { router } from 'expo-router';
import * as Updates from 'expo-updates';
import NfcManager from 'react-native-nfc-manager';
import ScreenView from '@/components/layout/screens/ScreenView';
import ContainerView from '@/components/layout/screens/ContainerView';
import LottieView from 'lottie-react-native';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import AppText from '@/components/ui/content/AppText';
import { APP_COLORS } from '@/constants/theme';
import scanningAnimation from '@/assets/lottie/NFC-QR-Reader.json';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import i18n from '@/lib/localization/i18n';
import { notificationData } from '@/dummy-data';
import { useNFC } from '@/Hooks/loyalty/useNFC';
import { getTranslated } from '@/lib/localization';
import { promptAlert } from '@/lib/alerts/promptAlert';
import { NFCErrorCode } from '@/lib/nfc/nfc.errors';
import { logger } from '@/lib/logger';

const HomeScreen = (): JSX.Element => {
  const { SCREEN_WIDTH } = useScreenDimensions();
  const { currentThemeColor } = useAppTheme();
  const { shadow } = useThemeStyles();

  const { scanForShop, isScanning, error } = useNFC();

  const lottieCustomStyles = {
    width: SCREEN_WIDTH / 1.4,
    height: 250,
    transform: [{ scale: 1.5 }]
  };

  const handleNFCScan = async () => {
    const scanningResult = await scanForShop();

    if (!scanningResult.success && scanningResult.error) {
      const errorCode = scanningResult.error.code;
      const errorTitle = getTranslated(`app.nfc.errors.${errorCode}.title`);
      const errorMessage = getTranslated(`app.nfc.errors.${errorCode}.message`);

      let alertActions = [];

      const isNfcDisabled = errorCode === NFCErrorCode.NOT_ENABLED;

      if (isNfcDisabled) {
        alertActions.push(
          {
            text: getTranslated('common.cancel'),
            style: 'cancel'
          },
          {
            text: getTranslated('common.open_settings'),
            style: 'default',
            onPress: async () => await NfcManager.goToNfcSetting()
          }
        );
      }

      promptAlert(errorTitle, errorMessage, alertActions);
      return;
    }

    // Success flow...

    logger.log('scanningResult: ', scanningResult);
  };

  return (
    <ScreenView>
      <TouchableOpacity
        testID='HomeScreen:NotificationButton'
        activeOpacity={0.8}
        style={shadow}
        className='w-[50px] h-[50px] m-5 flex absolute z-10 justify-center items-center self-end rounded-full bg-neutral-50 dark:bg-neutral-800'
        onPress={() => router.push('/notification')}
      >
        <FontAwesome
          testID='HomeScreen:NotificationIcon'
          name='bell-o'
          size={22}
          color={currentThemeColor}
        />
        <View className='w-[25px] h-[25px] bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -end-2'>
          <Text className='text-neutral-50 font-bold text-xs'>
            {notificationData.length}
          </Text>
        </View>
      </TouchableOpacity>
      <ContainerView>
        <View
          testID='HomeScreen:LottieViewWrapper'
          className='flex justify-center items-center -mt-20'
        >
          <LottieView
            testID='HomeScreen:LottieView'
            source={scanningAnimation}
            autoPlay
            loop={true}
            style={lottieCustomStyles}
          />
        </View>
        <AppText className='text-center text-lg my-2' weight='medium'>
          app.scan_NFC_or_QR
        </AppText>
        <View
          testID='HomeScreen:ScanningButtonsWrapper'
          className='flex-column gap-4 w-[70%] self-center mt-10'
        >
          <MainButton
            className='w-full bg-primary dark:bg-brand-800'
            title='app.tap_NFC_tag'
            icon='nfc'
            iconColor={APP_COLORS.neutral[400]}
            disabled={isScanning}
            isLoading={isScanning}
            onPress={handleNFCScan}
          />
          <MainButton
            className='w-full bg-primary dark:bg-brand-800'
            title='app.scan_QR'
            icon='qr-code'
            iconColor={APP_COLORS.neutral[400]}
          />
        </View>
      </ContainerView>
    </ScreenView>
  );
};

export default HomeScreen;
