import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import { useAuth } from '@/Hooks/auth/useAuth';
import { authService } from '@/services/firebase/auth.service';
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { getTranslated } from '@/lib/localization';

const VerifyEmailScreen = () => {
  const { currentThemeColor } = useAppTheme();
  const { user, isLoading, resendVerificationEmail, checkEmailVerification } =
    useAuth();
  const [countdown, setCountdown] = useState<number>(30);

  useEffect(() => {

    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const checkVerificationHandler = async (): Promise<void> => {
    const isVerified = await checkEmailVerification();

    if (!isVerified) return;
    router.replace('/home');
  };

  const resendVerificationHandler = async (): Promise<void> => {
    await resendVerificationEmail();
     setCountdown(30);
  };

  const handleUseAnotherEmail = async () => {
    await authService.logout();
    router.replace('/sign-up');
  };

  return (
    <ScrollingView>
      <ContainerView>
        <View className='flex-column w-full p-2 justify-center items-center my-7'>
          <AppIcon
            type='Ionicons'
            name='at'
            containerClassName='w-20 h-20 rounded-full bg-primary/40 dark:bg-primary/20 justify-center items-center mb-6'
            color={currentThemeColor}
            size={50}
          />
          <AppText className='text-3xl text-center' weight='bold'>
            auth.verifyEmail
          </AppText>
          <AppText
            className='text-sm text-center text-neutral-800 dark:text-neutral-500 mt-4'
            weight='semiBold'
          >
            auth.verifyEmail_entries_with_welcoming_msg
          </AppText>
          {user?.email && (
            <AppText
              className='text-base text-center text-primary mt-4'
              weight='bold'
            >
              {user.email}
            </AppText>
          )}
        </View>
        <View className='flex w-full p-2'>
          <MainButton
            testID='VerifyEmailScreen:CheckVerificationBtn'
            className='bg-primary dark:bg-brand-800'
            title='auth.ive_verified_my_email'
            isLoading={isLoading}
            onPress={checkVerificationHandler}
          />
          {countdown > 0 ? (
            <AppText
              withTranslation={false}
              className='text-sm text-neutral-600 dark:text-neutral-400 text-center mt-5'
              weight='medium'
            >
              {getTranslated('auth.resendVerificationEmailIn', { countdown: String(countdown) })}
            </AppText>
          ) : (
            <TouchableOpacity
              testID='VerifyEmailScreen:ResendVerificationBtn'
              activeOpacity={0.7}
              className='mt-5 py-2 items-center justify-center'
              onPress={resendVerificationHandler}
            >
              <AppText
                className='text-sm text-primary dark:text-brand-400'
                weight='semiBold'
              >
                auth.resendVerificationEmail
              </AppText>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            testID='VerifyEmailScreen:UseAnotherEmailBtn'
            activeOpacity={0.7}
            className='mt-6 items-center justify-center py-2'
            onPress={handleUseAnotherEmail}
          >
            <AppText
              className='text-sm text-neutral-800 dark:text-neutral-400'
              weight='semiBold'
            >
              auth.use_another_email
            </AppText>
          </TouchableOpacity>
          <View className='items-center mt-8'>
            <AppText className='text-sm text-center text-neutral-700 dark:text-neutral-500'>
              auth.didNotReceiveVerificationEmail
            </AppText>
          </View>
        </View>
      </ContainerView>
    </ScrollingView>
  );
};

export default VerifyEmailScreen;
