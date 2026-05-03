import React, { JSX } from "react";
import { I18nManager, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import * as Updates from "expo-updates";
import ScreenView from "@/components/layout/screens/ScreenView";
import ContainerView from "@/components/layout/screens/ContainerView";
import LottieView from "lottie-react-native";
import { useScreenDimensions } from "@/Hooks/layout/useScreenDimensions";
import MainButton from "@/components/ui/globals/buttons/MainButton";
import AppText from "@/components/ui/content/AppText";
import { APP_COLORS } from "@/constants/theme";
import scanningAnimation from "@/assets/lottie/NFC-QR-Reader.json";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAppTheme } from "@/Hooks/theme/useAppTheme";
import { useThemeStyles } from "@/Hooks/theme/useThemeStyles";
import i18n from "@/lib/localization/i18n";
import { useLocalStorage } from "@/Hooks/storage/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { walletData } from "@/dummy-data";

const HomeScreen = (): JSX.Element => {
  const { SCREEN_WIDTH } = useScreenDimensions();
  const { currentThemeColor } = useAppTheme();
  const { shadow } = useThemeStyles();
  const { getStorageItem, setStorageItem } = useLocalStorage();

  const lottieCustomStyles = {
    width: SCREEN_WIDTH / 1.4,
    height: 250,
    transform: [{ scale: 1.5 }],
  };

  // This is a temp function to test language switching
  const switchLanguageHandler = async (): Promise<any> => {
    // Will be applied soon!

    return null;

    const savedLang = await getStorageItem(LOCAL_STORAGE_KEYS.APP_LANG);

    const changedLang = savedLang === "en" ? "ar" : "en";

    const isRTL = changedLang === "ar";

    await i18n.changeLanguage(changedLang);
    await setStorageItem(LOCAL_STORAGE_KEYS.APP_LANG, changedLang);

    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    await Updates.reloadAsync();
    return;
  };

  return (
    <ScreenView>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-1/4 flex justify-center items-center m-2 p-2 bg-indigo-600 rounded-full"
        onPress={switchLanguageHandler}
      >
        <Text className="text-white">Switch Lang</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="HomeScreen:NotificationButton"
        activeOpacity={0.8}
        style={shadow}
        className="w-[50px] h-[50px] m-5 flex absolute z-10 justify-center items-center self-end rounded-full bg-neutral-50 dark:bg-neutral-800"
        onPress={() => router.push("/notification")}
      >
        <FontAwesome
          testID="HomeScreen:NotificationIcon"
          name="bell-o"
          size={22}
          color={currentThemeColor}
        />
        <View className="w-[25px] h-[25px] bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -end-2">
          <Text className="text-neutral-50 font-bold text-xs">
            {walletData.length}
          </Text>
        </View>
      </TouchableOpacity>
      <ContainerView>
        <View
          testID="HomeScreen:LottieViewWrapper"
          className="flex justify-center items-center -mt-20"
        >
          <LottieView
            testID="HomeScreen:LottieView"
            source={scanningAnimation}
            autoPlay
            loop={true}
            style={lottieCustomStyles}
          />
        </View>
        <AppText className="text-center font-medium text-lg my-2">
          app.scan_NFC_or_QR
        </AppText>
        <View
          testID="HomeScreen:ScanningButtonsWrapper"
          className="flex-column gap-4 w-[70%] self-center mt-10"
        >
          <MainButton
            className="w-full bg-primary dark:bg-brand-800"
            title="app.tap_NFC_tag"
            icon="nfc"
            iconColor={APP_COLORS.neutral[400]}
          />
          <MainButton
            className="w-full bg-primary dark:bg-brand-800"
            title="app.scan_QR"
            icon="qr-code"
            iconColor={APP_COLORS.neutral[400]}
          />
        </View>
      </ContainerView>
    </ScreenView>
  );
};

export default HomeScreen;
