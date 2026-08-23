import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import MainInputField from '@/components/ui/globals/inputFields/MainInputField';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import { useAuth } from '@/Hooks/auth/useAuth';

const ForgotPasswordScreen = () => {
  const { isLoading, sendPasswordResetEmail } = useAuth();

  const [email, setEmail] = useState<string>('');

  const onSubmitPasswordResetHandler = async (): Promise<void> => {
    const isEmailSent = await sendPasswordResetEmail(email);
    if (!isEmailSent) return;
    router.replace({
      pathname: '/password-reset-sent',
      params: {
        email
      }
    })
  };

  return (
    <KeyboardAvoidingView
      testID='ForgotPasswordScreen:KeyboardAvoidingView'
      className='flex-1'
      behavior='padding'
    >
      <ScrollingView>
        <GoBackButton />
        <ContainerView className='justify-start'>
          <View className='flex-column w-full p-2 justify-center items-center my-5'>
            <AppText className='text-3xl text-center' weight='bold'>
              auth.forgotPassword
            </AppText>
            <AppText
              className='text-sm text-center text-neutral-800 dark:text-neutral-500 mt-4'
              weight='semiBold'
            >
              auth.forgotPassword_entries_with_welcoming_msg
            </AppText>
          </View>
          <View className='flex w-full p-2'>
            <MainInputField
              placeholder='example@gmail.com'
              icon='email'
              onChangeText={setEmail}
            />
            <MainButton
              testID='ForgotPasswordScreen:SubmitBtn'
              className='bg-primary dark:bg-brand-800 mt-8'
              title='auth.submit'
              isLoading={isLoading}
              onPress={onSubmitPasswordResetHandler}
            />
          </View>
        </ContainerView>
      </ScrollingView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
