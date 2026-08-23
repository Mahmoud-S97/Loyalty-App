import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { getTranslated } from '@/lib/localization';
import { useAuth } from '@/Hooks/auth/useAuth';

const PasswordResetSentScreen = () => {
  const { currentThemeColor } = useAppTheme();

  const { sendPasswordResetEmail } = useAuth();

  const { email } = useLocalSearchParams<{ email?: string }>();
  const [countdown, setCountdown] = useState<number>(30);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const resendPasswordResetEmailHandler = async (): Promise<void> => {
    await sendPasswordResetEmail(email || '');
    setCountdown(30);
  };

  return (
    <ScrollingView>
      <ContainerView>
        <View className='flex-column w-full p-2 justify-center items-center my-7'>
          <AppIcon
            type='Ionicons'
            name='mail-outline'
            containerClassName='w-20 h-20 rounded-full bg-primary/40 dark:bg-primary/20 justify-center items-center mb-6'
            color={currentThemeColor}
            size={40}
          />

          <AppText className='text-3xl text-center' weight='bold'>
            auth.passwordResetSent
          </AppText>

          <AppText
            className='text-sm text-center text-neutral-800 dark:text-neutral-500 mt-4'
            weight='semiBold'
          >
            auth.passwordResetSent_entries_with_welcoming_msg
          </AppText>
          {email && (
            <AppText
              className='text-base text-center text-primary mt-4'
              weight='bold'
            >
              {email.toLowerCase()}
            </AppText>
          )}
        </View>

        <View className='flex w-full p-2'>
          <View className='items-center px-4'>
            <AppText
              className='text-sm text-center text-neutral-700 dark:text-neutral-400'
              weight='medium'
            >
              auth.passwordResetSent_checkYourInbox
            </AppText>
          </View>

          <MainButton
            testID='PasswordResetSentScreen:BackToLoginBtn'
            className='bg-primary dark:bg-brand-800 mt-8'
            title='auth.backToLogin'
            onPress={() => router.replace('/login')}
          />
          {countdown > 0 ? (
            <AppText
              withTranslation={false}
              className='text-sm text-neutral-600 dark:text-neutral-400 text-center mt-6'
              weight='medium'
            >
              {getTranslated('auth.passwordResetEmailIn', {
                countdown: String(countdown)
              })}
            </AppText>
          ) : (
            <TouchableOpacity
              testID='VerifyEmailScreen:ResendVerificationBtn'
              activeOpacity={0.7}
              className='mt-6 py-2 items-center justify-center'
              onPress={resendPasswordResetEmailHandler}
            >
              <AppText
                className='text-sm text-primary dark:text-brand-400'
                weight='semiBold'
              >
                auth.passwordResetEmail
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </ContainerView>
    </ScrollingView>
  );
};

export default PasswordResetSentScreen;
