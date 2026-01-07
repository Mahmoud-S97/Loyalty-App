import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import ScreenView from '@/components/layout/screens/ScreenView';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import MainInputField from '@/components/ui/globals/inputFields/MainInputField';

const ForgotPasswordScreen = () => {

  return (
    <KeyboardAvoidingView className='flex-1' behavior='padding'>
      <ScreenView>
        <ContainerView className='justify-start'>
          <View className='flex-column w-full p-2 justify-center items-center my-10'>
            <AppText className='text-3xl text-center font-trans font-bold'>auth.forgotPassword</AppText>
            <AppText className='text-sm text-center font-bold text-neutral-800 dark:text-neutral-500 mt-4'>auth.forgotPassword_entries_with_welcoming_msg</AppText>
          </View>
          <View className='flex w-full p-2'>
            <MainInputField placeholder='example@gmail.com' value='' icon='email' />
            <MainButton className='bg-primary mt-8' title='auth.submit' onPress={() => router.navigate('/reset-password')} />
          </View>
        </ContainerView>
      </ScreenView>
    </KeyboardAvoidingView>
  )
}

export default ForgotPasswordScreen;