import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import ScreenView from '@/components/layout/screens/ScreenView';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import MainInputField from '@/components/ui/globals/inputFields/MainInputField';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';

const ResetPasswordScreen = () => {

  return (
    <KeyboardAvoidingView testID='ResetPasswordScreen:KeyboardAvoidingView' className='flex-1' behavior='padding'>
      <ScreenView>
        <GoBackButton />
        <ContainerView className='justify-start'>
          <View className='flex-column w-full p-2 justify-center items-center my-5'>
            <AppText className='text-3xl text-center font-trans font-bold'>auth.resetPassword</AppText>
            <AppText className='text-sm text-center font-bold text-neutral-800 dark:text-neutral-500 mt-4'>auth.resetPassword_entries_with_welcoming_msg</AppText>
          </View>
          <View className='flex w-full p-2'>
            <MainInputField placeholder='auth.password' icon='lock' className='my-7' secureTextEntry={true} />
            <MainInputField placeholder='auth.confirmPassword' icon='lock' className='mb-7' secureTextEntry={true} />
            <MainButton testID='ResetPasswordScreen:ResetPasswordBtn' className='bg-primary' title='auth.reset' onPress={() => {
              router.dismissAll();
              router.replace('/login');
            }} />
          </View>
        </ContainerView>
      </ScreenView>
    </KeyboardAvoidingView>
  )
}

export default ResetPasswordScreen;