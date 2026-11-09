import React, { JSX, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
import { notificationData } from '@/dummy-data';
import { useNFC } from '@/Hooks/loyalty/useNFC';
import { useAppConfig } from '@/Hooks/app/useAppConfig';
import { getTranslated } from '@/lib/localization';
import { promptAlert } from '@/lib/alerts/promptAlert';
import { NFCErrorCode } from '@/lib/nfc/nfc.errors';
import { logger } from '@/lib/logger';
import StampCollectedModal from '@/components/loyalty/modals/StampCollectedModal';
import VoucherCollectedModal from '@/components/loyalty/modals/VoucherCollectedModal';
import Spinner from '@/components/ui/globals/Spinner';
import { useWallet } from '@/Hooks/wallet/useWallet';
import { useShops } from '@/Hooks/shops/useShops';
import { LoyaltyCardDto, UserWalletDto } from '@/types';
import { CreateOrUpdateUserWalletDto } from '@/services/firebase/userWallet.service';

const HomeScreen = (): JSX.Element => {
  const { SCREEN_WIDTH } = useScreenDimensions();
  const { currentThemeColor } = useAppTheme();
  const { shadow } = useThemeStyles();
  const { scanForShop, isScanning, error } = useNFC();
  const { appPreferences, isLoading } = useAppConfig();

  const { getShopById } = useShops();
  const {
    getWalletByShopId,
    createOrUpdateUserWallet,
    isLoading: isCollectingStamp
  } = useWallet();

  const isNotificationsButtonPressed = useRef<boolean>(false);

  const [isStampCollected, setIsStampCollected] = useState<boolean>(false);
  const [isVoucherCollected, setIsVoucherCollected] = useState<boolean>(false);
  const [stampsLeft, setStampsLeft] = useState<number>(0);

  const lottieCustomStyles = {
    width: SCREEN_WIDTH / 1.4,
    height: 250,
    transform: [{ scale: 1.5 }]
  };

  const navigateToNotificationsHandler = () => {
    if (isNotificationsButtonPressed.current) return;

    isNotificationsButtonPressed.current = true;

    router.push('/notification');

    setTimeout(() => (isNotificationsButtonPressed.current = false), 700);
  };

  const handleNFCScan = async () => {
    const scanningResult = await scanForShop();
    logger.log('scanningResult: ', scanningResult);

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

    // === NFC Tap Success flow === //

    const shopId = scanningResult?.shopId;

    if (!shopId) return;

    const shopData = await getShopById(shopId);
    if (!shopData) return;

    const walletData = await getWalletByShopId(shopId);

    let isVoucherCompleted = false;

    let loyaltyCards = walletData?.loyaltyCards || [];

    const allCardsCompleted = loyaltyCards.every(
      (card) => card.status === 'completed'
    );

    let newLoyaltyCard = {
      id: new Date().toISOString(),
      stamps: 1,
      status: 'active',
      redeemedAt: null,
      completedAt: null,
      createdAt: new Date().toISOString()
    } as LoyaltyCardDto;

    if (loyaltyCards.length === 0 || allCardsCompleted) {
      loyaltyCards.push(newLoyaltyCard);
    } else {
      loyaltyCards = loyaltyCards.map((item, _) => {
        if (item.status === 'active') {
          if (item.stamps >= shopData.threshold - 1) {
            isVoucherCompleted = true;
            return {
              ...item,
              stamps: shopData.threshold,
              status: 'completed',
              completedAt: new Date().toISOString()
            };
          } else {
            return { ...item, stamps: (item.stamps += 1) };
          }
        } else {
          return item;
        }
      }) as LoyaltyCardDto[];
    }

    const data: UserWalletDto = {
      id: shopData.id,
      shopId: shopData.id,
      shopName: shopData.name,
      shopDescription: shopData.description,
      shopAddress: shopData.address,
      shopLogo: shopData.logo,
      shopCoverImage: shopData.coverImage,
      rewardTitle: shopData.rewardTitle,
      threshold: shopData.threshold,
      loyaltyCards
    };

    const result = await createOrUpdateUserWallet(shopId, data);

    if (result) {
      if (isVoucherCompleted) {
        setIsVoucherCollected(true);
        return;
      }
      const currentStamps =
        loyaltyCards.find((card) => card.status === 'active')?.stamps ?? 0;
      const whatStampsLeft = shopData.threshold - currentStamps;
      setIsStampCollected(true);
      setStampsLeft(whatStampsLeft);
    }
  };

  const handlerStampCollectionModalClose = () => {
    setIsStampCollected(false);
  };

  const handleVoucherCollectionModalClose = () => {
    setIsVoucherCollected(false);
  };

  return (
    <ScreenView>
      <TouchableOpacity
        testID='HomeScreen:NotificationButton'
        activeOpacity={0.8}
        style={shadow}
        className='w-[50px] h-[50px] m-5 flex absolute z-10 justify-center items-center self-end rounded-full bg-neutral-50 dark:bg-neutral-800'
        onPress={navigateToNotificationsHandler}
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
        {(appPreferences?.enableNFC || appPreferences?.enableQRCode) && (
          <View
            testID='HomeScreen:ScanningButtonsWrapper'
            className='flex-column gap-4 w-[70%] self-center mt-10'
          >
            {appPreferences?.enableNFC && (
              <MainButton
                className='w-full bg-primary dark:bg-brand-800'
                title='app.tap_NFC_tag'
                icon='nfc'
                iconColor={APP_COLORS.neutral[400]}
                disabled={isScanning || isCollectingStamp}
                isLoading={isScanning || isCollectingStamp}
                onPress={handleNFCScan}
              />
            )}
            {appPreferences?.enableQRCode && (
              <MainButton
                className='w-full bg-primary dark:bg-brand-800'
                title='app.scan_QR'
                icon='qr-code'
                iconColor={APP_COLORS.neutral[400]}
              />
            )}
          </View>
        )}
        <StampCollectedModal
          visible={isStampCollected}
          stampsLeft={stampsLeft}
          onClose={handlerStampCollectionModalClose}
        />
        <VoucherCollectedModal
          visible={isVoucherCollected}
          onClose={handleVoucherCollectionModalClose}
        />
      </ContainerView>
      {isLoading && <Spinner />}
    </ScreenView>
  );
};

export default HomeScreen;
