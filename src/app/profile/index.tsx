import React, { JSX } from "react";
import { Image, View } from "react-native";
import ContainerView from "@/components/layout/screens/ContainerView";
import ScrollingView from "@/components/layout/screens/ScrollingView";
import { LOCAL_IMAGES } from "@/constants/images";
import AppText from "@/components/ui/content/AppText";
import GoBackButton from "@/components/ui/globals/buttons/GoBackButton";
import MainInputField from "@/components/ui/globals/inputFields/MainInputField";
import GenderList from "@/components/loyalty/gender/GenderList";
import MainButton from "@/components/ui/globals/buttons/MainButton";
import { APP_COLORS } from "@/constants/theme";

const ProfileScreen = (): JSX.Element => {
  return (
    <ScrollingView>
      <ContainerView className="items-start">
        <GoBackButton className="absolute z-1 m-0 top-4 start-4" />
        <View className="w-24 h-24 rounded-full overflow-hidden self-center">
          <Image
            source={LOCAL_IMAGES.LOGO}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <AppText
          withTranslation={false}
          numberOfLines={2}
          className="font-semibold text-xl mt-6 text-center self-center px-4"
        >
          Mahmoud Al-Saleh - محمود الصالح
        </AppText>
        <AppText
          withTranslation={false}
          numberOfLines={2}
          className="text-center self-center my-4 text-neutral-800"
        >
          example@gmail.com
        </AppText>
        <View className="w-full flex flex-col items-start justify-center mb-8">
          <AppText>auth.name</AppText>
          <MainInputField
            value="Mahmoud Saleh"
            className="w-full px-0 rounded-none border-b border-neutral-500 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
            textInputClassName="ms-0 font-semibold bg-neutral-100 dark:bg-neutral-900"
            withShadow={false}
            withIcon={false}
          />
        </View>
        <View className="w-full flex flex-col items-start justify-center mb-8">
          <AppText>auth.email</AppText>
          <MainInputField
            value="example@gmail.com"
            className="w-full px-0 rounded-none border-b border-neutral-500 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
            textInputClassName="ms-0 font-semibold bg-neutral-100 dark:bg-neutral-900"
            withShadow={false}
            withIcon={false}
          />
        </View>
        <View className="w-full flex flex-col items-start justify-center mb-8">
          <AppText>app.date_of_birth</AppText>
          <MainInputField
            value="1997/03/11"
            className="w-full px-0 rounded-none border-b border-neutral-500 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
            textInputClassName="ms-0 font-semibold bg-neutral-100 dark:bg-neutral-900"
            withShadow={false}
            withIcon={false}
          />
        </View>
        <View className="w-full flex flex-col items-start justify-center gap-6 mb-8">
          <AppText>app.gender.gender_identity</AppText>
          <GenderList />
        </View>
        <MainButton
          className="w-full bg-primary dark:bg-brand-800 mt-2"
          title="app.update"
          iconColor={APP_COLORS.neutral[400]}
        />
      </ContainerView>
    </ScrollingView>
  );
};

export default ProfileScreen;
