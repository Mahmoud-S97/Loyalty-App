import React, {
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { promptAlert } from '@/lib/alerts/promptAlert';
import { getTranslated } from '@/lib/localization';
import { handleMediaPermissionErrorMessage } from '@/utils/userProfile';
import { MEDIA_PERMISSION_ERROR_CODES } from '@/constants/account/userProfile';

type EditUserProfileData = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: UserProfile['gender'];
  photoURL: string | null;
};

const PROFILE_EDITABLE_FIELDS: (keyof EditUserProfileData)[] = [
  'fullName',
  'dateOfBirth',
  'gender',
  'photoURL'
];

const ProfileScreen = (): JSX.Element => {
  const { is_dark } = useAppTheme();
  const { user } = useAuth();
  const { userProfile, isProfileLoading, updateUserProfile } = useUser();

  const [userData, setUserData] = useState<EditUserProfileData | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const birthDateBottomSheetRef = useRef<BottomSheetModal>(null);
  const imageBottomSheetRef = useRef<BottomSheetModal>(null);

  const selectedDate = userData?.dateOfBirth
    ? new Date(`${userData.dateOfBirth}T00:00:00`)
    : new Date();

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

  const setProfileFieldHandler = useCallback(
    (field: keyof EditUserProfileData, value: string | null) => {
      setUserData((prevState) =>
        prevState
          ? {
              ...prevState,
              [field]: value
            }
          : prevState
      );
    },
    []
  );

  const IS_UPDATING = useMemo(() => {
    if (!userData || !userProfile) return false;

    return PROFILE_EDITABLE_FIELDS.some(
      (field) => userData[field] !== userProfile[field]
    );
  }, [userData, userProfile]);

  const updateProfileHandler = async (): Promise<void> => {
    if (!user?.uid || !userData) return;

    await updateUserProfile(user.uid, {
      fullName: userData.fullName,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      photoURL: userData.photoURL
    });
  };

  const onDismissDateHandler = () => {
    setShowDatePicker(false);
  };

  const onSelectDateOfBirth = () => {
    if (is_IOS()) {
      setTimeout(() => {
        birthDateBottomSheetRef.current?.present();
      }, 50);

      return;
    }

    setShowDatePicker(true);
  };

  const onValueChangeDateHandler = (_event: any, selectedDate?: Date) => {
    if (!selectedDate) return;

    const formattedDate = getFormattedDate(selectedDate);

    setProfileFieldHandler('dateOfBirth', formattedDate);

    if (!is_IOS()) {
      setShowDatePicker(false);
    }
  };

  const openProfilePhotoSheet = () => {
    imageBottomSheetRef.current?.present();
  };

  const handleTakePhoto = async (): Promise<void> => {
    try {
      imageBottomSheetRef.current?.dismiss();

      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        handleMediaPermissionErrorMessage(
          MEDIA_PERMISSION_ERROR_CODES.request_camera
        );
        return;
      }

      if (permission.status === 'denied') {
        handleMediaPermissionErrorMessage(
          MEDIA_PERMISSION_ERROR_CODES.camera_denied
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8
      });

      if (result.canceled) return;

      const image = result.assets[0];

      setProfileFieldHandler('photoURL', image.uri);
    } catch (error: any) {
      const errorCode =
        error?.code || MEDIA_PERMISSION_ERROR_CODES.something_went_wrong;

      handleMediaPermissionErrorMessage(errorCode);
    }
  };

  const handleChooseFromLibrary = async (): Promise<void> => {
    try {
      imageBottomSheetRef.current?.dismiss();

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        handleMediaPermissionErrorMessage(
          MEDIA_PERMISSION_ERROR_CODES.request_library
        );
        return;
      }

      if (permission.status === 'denied') {
        handleMediaPermissionErrorMessage(
          MEDIA_PERMISSION_ERROR_CODES.media_library_denied
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8
      });

      if (result.canceled) return;

      const image = result.assets[0];

      setProfileFieldHandler('photoURL', image.uri);
    } catch (error: any) {
      const errorCode =
        error?.code || MEDIA_PERMISSION_ERROR_CODES.something_went_wrong;

      handleMediaPermissionErrorMessage(errorCode);
    }
  };

  const handleRemovePhoto = async () => {
    imageBottomSheetRef.current?.dismiss();
    setProfileFieldHandler('photoURL', null);

    // Remove photo from storage
    // Update Firestore photoURL
    // Update local userData
  };

  return (
    <ScrollingView>
      <ContainerView className='items-start'>
        <GoBackButton
          testID='ProfileScreen:GoBackButton'
          className='absolute z-1 m-0 top-4 start-4'
        />

        <View className='flex w-24 h-24 items-center justify-center relative self-center'>
          {userData?.photoURL ? (
            <View className='flex w-full h-full rounded-full items-center justify-center overflow-hidden'>
              <Image
                testID='ProfileScreen:Image:Logo'
                source={{ uri: userData?.photoURL }}
                className='w-full h-full'
                resizeMode='contain'
              />
            </View>
          ) : (
            <View className='flex w-full h-full rounded-full items-center justify-center bg-accent'>
              <AppText
                className='text-3xl text-neutral-900 dark:text-neutral-800'
                weight='semiBold'
              >
                {userData?.fullName.charAt(0)}
              </AppText>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            className='flex items-center justify-center absolute z-1000 -bottom-2 -end-2'
            onPress={openProfilePhotoSheet}
          >
            <AppIcon
              type='MaterialCommunityIcons'
              name='image-edit'
              size={35}
              color={
                is_dark ? APP_COLORS.neutral[400] : APP_COLORS.neutral[800]
              }
            />
          </TouchableOpacity>
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
              {userData?.dateOfBirth || 'YYYY-MM-DD'}
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
          disabled={isProfileLoading || !IS_UPDATING}
          onPress={updateProfileHandler}
        />

        {/* iOS Bottom Sheet */}
        {is_IOS() && (
          <AppBottomSheet ref={birthDateBottomSheetRef}>
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
              onPress={() => birthDateBottomSheetRef.current?.dismiss()}
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
        <AppBottomSheet ref={imageBottomSheetRef}>
          <View className='w-full gap-3'>
            <AppText className='text-xl text-center mb-2' weight='semiBold'>
              app.messages.profile_photo.title
            </AppText>

            <AppText className='text-center text-neutral-700 dark:text-neutral-400 mb-4'>
              app.messages.profile_photo.description
            </AppText>

            {/* Take Photo */}
            <TouchableOpacity
              activeOpacity={0.7}
              className='w-full h-14 flex-row items-center  border border-neutral-500 dark:border-neutral-700 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800'
              onPress={handleTakePhoto}
            >
              <AppText withTranslation={false} weight='semiBold'>
                {`📷 ${getTranslated('app.messages.profile_photo.take_photo')}`}{' '}
              </AppText>
            </TouchableOpacity>

            {/* Choose from Library */}
            <TouchableOpacity
              activeOpacity={0.7}
              className='w-full h-14 flex-row items-center  border border-neutral-500 dark:border-neutral-700 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800'
              onPress={handleChooseFromLibrary}
            >
              <AppText
                withTranslation={false}
                weight='semiBold'
              >{`🖼️ ${getTranslated('app.messages.profile_photo.choose_from_library')}`}</AppText>
            </TouchableOpacity>

            {/* Remove Photo */}
            {userData?.photoURL && (
              <TouchableOpacity
                activeOpacity={0.7}
                className='w-full h-14 flex-row items-center px-4 rounded-xl'
                onPress={handleRemovePhoto}
              >
                <AppText
                  withTranslation={false}
                  className='text-danger dark:text-danger'
                  weight='semiBold'
                >
                  {`🗑️ ${getTranslated('app.messages.profile_photo.remove_photo')}`}
                </AppText>
              </TouchableOpacity>
            )}

            <MainButton
              title='common.cancel'
              className='w-full bg-neutral-100 border border-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 mt-2'
              textClassName='text-neutral-800 dark:text-neutral-400'
              onPress={() => imageBottomSheetRef.current?.dismiss()}
            />
          </View>
        </AppBottomSheet>
      </ContainerView>

      {isProfileLoading && <Spinner />}
    </ScrollingView>
  );
};

export default ProfileScreen;
