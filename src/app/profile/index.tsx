import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ContainerView from '@/components/layout/screens/ContainerView';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import { LOCAL_IMAGES } from '@/constants/images';
import AppText from '@/components/ui/content/AppText';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import MainInputField from '@/components/ui/globals/inputFields/MainInputField';
import GenderList from '@/components/loyalty/gender/GenderList';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import { APP_COLORS } from '@/constants/theme';
import { useUser } from '@/Hooks/user/useUser';
import Spinner from '@/components/ui/globals/Spinner';
import { UserProfile } from '@/types/user';
import { useAuth } from '@/Hooks/auth/useAuth';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import AppBottomSheet from '@/components/ui/modals/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { getFormattedDate, is_IOS } from '@/utils';

type EditUserProfileData = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: UserProfile['gender'];
  photoURL: string | null;
};

const ProfileScreen = (): JSX.Element => {
  const { user } = useAuth();
  const { userProfile, isProfileLoading, updateUserProfile } = useUser();

  const [userData, setUserData] = useState<EditUserProfileData | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isUserUpdating, setIsUserUpdating] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!userProfile) return;

    setUserData({
      fullName: userProfile.fullName,
      email: userProfile.email,
      dateOfBirth: userProfile.dateOfBirth,
      gender: userProfile.gender,
      photoURL: userProfile.photoURL
    });
  }, [userProfile]);

  const setProfileFieldHandler = useCallback((field: string, value: string) => {
    setIsUserUpdating(true);
    setUserData((prevState) =>
      prevState
        ? {
            ...prevState,
            [field]: value
          }
        : prevState
    );
  }, []);

  const updateProfileHandler = async (): Promise<void> => {
    if (!user?.uid || !userData) return;

    await updateUserProfile(user.uid, {
      fullName: userData.fullName,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      photoURL: userData.photoURL
    });
    setIsUserUpdating(false);
  };

  const onDismissDateHandler = () => {
    setShowDatePicker(false);
  };

  const onSelectDateOfBirth = () => {
    if (is_IOS()) {
      setTimeout(() => {
        bottomSheetRef.current?.present();
      }, 50);

      return;
    }

    setShowDatePicker(true);
  };

  const onValueChangeDateHandler = (_event: any, selectedDate?: Date) => {
    if (!selectedDate) return;

    const formattedDate = getFormattedDate(selectedDate);
    console.log('Formatted-Date::::::: ', formattedDate);

    setProfileFieldHandler('dateOfBirth', formattedDate);

    if (!is_IOS()) {
      setShowDatePicker(false);
    }
  };

  const selectedDate = userData?.dateOfBirth
    ? new Date(`${userData.dateOfBirth}T00:00:00`)
    : new Date();

  return (
    <ScrollingView>
      <ContainerView className='items-start'>
        <GoBackButton
          testID='ProfileScreen:GoBackButton'
          className='absolute z-1 m-0 top-4 start-4'
        />

        <View className='w-24 h-24 rounded-full overflow-hidden self-center'>
          <Image
            testID='ProfileScreen:Image:Logo'
            source={LOCAL_IMAGES.LOGO}
            className='w-full h-full'
            resizeMode='contain'
          />
        </View>

        <AppText
          withTranslation={false}
          numberOfLines={2}
          className='text-xl mt-6 text-center self-center px-4'
          weight='semiBold'
        >
          {userData?.fullName}
        </AppText>

        <AppText
          withTranslation={false}
          numberOfLines={2}
          className='text-center self-center my-4 text-neutral-800'
        >
          {userData?.email}
        </AppText>

        {/* Full Name */}
        <View className='w-full flex flex-col items-start justify-center mb-8'>
          <AppText>auth.name</AppText>

          <MainInputField
            testID='ProfileScreen:FullNameInput'
            value={userData?.fullName}
            className='w-full px-0 rounded-none border-b border-neutral-500 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900'
            textInputClassName='ms-0 bg-neutral-100 dark:bg-neutral-900'
            withShadow={false}
            withIcon={false}
            weight='semiBold'
            onChangeText={(value) => setProfileFieldHandler('fullName', value)}
          />
        </View>

        {/* Email */}
        <View className='w-full flex flex-col items-start justify-center mb-8'>
          <AppText>auth.email</AppText>

          <MainInputField
            testID='ProfileScreen:EmailInput'
            value={userData?.email}
            className='w-full px-0 rounded-none border-b border-neutral-500 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900'
            textInputClassName='ms-0 bg-neutral-100 dark:bg-neutral-900'
            withShadow={false}
            withIcon={false}
            weight='semiBold'
            editable={false}
          />
        </View>

        {/* Date of Birth */}
        <View className='w-full flex flex-col items-start justify-center mb-8'>
          <AppText>app.date_of_birth</AppText>

          <TouchableOpacity
            activeOpacity={0.9}
            className='w-full h-[55px] px-0 flex justify-center items-start rounded-none border-b border-neutral-500 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900'
            onPress={onSelectDateOfBirth}
          >
            <AppText
              className='ms-0 bg-neutral-100 dark:bg-neutral-900'
              weight='semiBold'
            >
              {userData?.dateOfBirth}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Gender */}
        <View className='w-full flex flex-col items-start justify-center gap-6 mb-8'>
          <AppText>app.gender.gender_identity</AppText>

          <GenderList
            testID='ProfileScreen:GenderList'
            onSelectGender={(value) => setProfileFieldHandler('gender', value)}
            currentGender={userData?.gender}
          />
        </View>

        {/* Update */}
        <MainButton
          testID='ProfileScreen:UpdateButton'
          className='w-full bg-primary dark:bg-brand-800 mt-2'
          title='app.update'
          iconColor={APP_COLORS.neutral[400]}
          isLoading={isProfileLoading}
          disabled={isProfileLoading || !isUserUpdating}
          onPress={updateProfileHandler}
        />

        {/* iOS Bottom Sheet */}
        {is_IOS() && (
          <AppBottomSheet ref={bottomSheetRef}>
            <RNDateTimePicker
              mode='date'
              display='spinner'
              value={selectedDate}
              maximumDate={new Date()}
              onValueChange={onValueChangeDateHandler}
            />

            <MainButton
              title='common.done'
              className='bg-primary mt-8'
              onPress={() => bottomSheetRef.current?.dismiss()}
            />
          </AppBottomSheet>
        )}

        {/* Android Native Picker */}
        {!is_IOS() && showDatePicker && (
          <RNDateTimePicker
            mode='date'
            display='default'
            value={selectedDate}
            maximumDate={new Date()}
            onValueChange={onValueChangeDateHandler}
            onDismiss={onDismissDateHandler}
          />
        )}
      </ContainerView>

      {isProfileLoading && <Spinner />}
    </ScrollingView>
  );
};

export default ProfileScreen;
