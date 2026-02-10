import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import { LOCAL_ICONS } from '@/constants/icons';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import MainInputField from '@/components/ui/globals/inputFields/MainInputField';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';

const LoginScreen = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Temporarly, validation will be handled later on
  const setEmailHandler = (value: string): void => setEmail(value);
  const setPasswordHandler = (value: string): void => setPassword(value)

  return (
    <KeyboardAvoidingView testID='LoginScreen:KeyboardAvoidingView' className='flex-1' behavior='padding'>
      <ScrollingView>
        <GoBackButton />
        <ContainerView>
          <View className='flex-column w-full p-2 justify-center items-center my-7'>
            <AppText className='text-3xl text-center font-trans font-bold'>auth.login</AppText>
            <AppText className='text-sm text-center font-bold text-neutral-800 dark:text-neutral-500 mt-4'>auth.login_entries_with_welcoming_msg</AppText>
          </View>
          <View className='flex w-full p-2'>
            <MainInputField placeholder='example@gmail.com' icon='email' value={email}  onChangeText={setEmailHandler} />
            <MainInputField placeholder='auth.password' icon='lock' className='mt-7' secureTextEntry={true} value={password} onChangeText={setPasswordHandler} />
            <TouchableOpacity testID='LoginScreen:ForgotPasswordBtn' activeOpacity={0.7} className='ms-auto mt-3 mb-5' onPress={() => router.navigate('/forgot-password')}>
              <AppText className='text-neutral-800 dark:text-neutral-500'>auth.ask_forgotPassword</AppText>
            </TouchableOpacity>
            <MainButton testID='LoginScreen:LoginBtn' className='bg-primary dark:bg-brand-800' title='auth.login' onPress={() => router.navigate('/home')} />
            <View className='flex-row justify-between items-center my-5'>
              <View className='w-[44%] h-[1px] bg-neutral-500' />
              <AppText className='w-[12%] text-center uppercase'>prepositions.or</AppText>
              <View className='w-[44%] h-[1px] bg-neutral-500' />
            </View>
            <MainButton className='bg-neutral-100 dark:bg-neutral-300' textClassName='text-neutral-900 dark:text-neutral-800 font-medium' title='auth.continue_with_google' image={LOCAL_ICONS.GOOGLE} onPress={() => {}} />
            <TouchableOpacity testID='LoginScreen:SignUpBtn' activeOpacity={0.7} className='flex-row items-center justify-center mt-8' onPress={() => router.navigate('/sign-up')}>
              <AppText className='me-2 text-neutral-800 dark:text-neutral-500'>auth.have_not_an_account</AppText>
              <AppText className='text-primary font-trans font-[600]'>auth.signUp</AppText>
            </TouchableOpacity>
          </View>
        </ContainerView>
      </ScrollingView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;