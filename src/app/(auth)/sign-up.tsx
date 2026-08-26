import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import { LOCAL_ICONS } from '@/constants/icons';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import MainInputField from '@/components/ui/globals/inputFields/MainInputField';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import { useAuth } from '@/Hooks/auth/useAuth';
import { useUser } from '@/Hooks/user/useUser';

const SignUpScreen = () => {
  const { isLoading, signUp } = useAuth();
  const { createUserProfile } = useUser();

  const [signUpFields, setSignUpFields] = useState<Record<string, string>>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const setSignUpFieldHandler = useCallback(
    (fieldName: string, value: string) => {
      setSignUpFields((prevField) => ({ ...prevField, [fieldName]: value }));
    },
    [signUpFields]
  );

  const signUpHandler = async (): Promise<void> => {
    const user = await signUp(
      signUpFields.email,
      signUpFields.password,
      signUpFields.confirmPassword
    );
    if (user?.uid) {
      await createUserProfile(user.uid, {
        email: user.email,
        fullName: 'Mahmoud Saleh',
        gender: 'male',
        dateOfBirth: '1997-03-11',
        photoURL: null
      });
      router.replace('/verify-email');
    }
  };

  return (
    <KeyboardAvoidingView
      testID='SignUpScreen:KeyboardAvoidingView'
      className='flex-1'
      behavior='padding'
    >
      <ScrollingView>
        <ContainerView className='pb-20'>
          <View className='flex-column w-full p-2 justify-center items-center my-7'>
            <AppText className='text-3xl text-center' weight='bold'>
              auth.signUp
            </AppText>
            <AppText
              className='text-sm text-center text-neutral-800 dark:text-neutral-500 mt-4'
              weight='semiBold'
            >
              auth.signUp_entries_with_welcoming_msg
            </AppText>
          </View>
          <View className='flex w-full p-2'>
            <MainInputField
              testID='SignUpScreen:EmailInput'
              placeholder='example@gmail.com'
              icon='email'
              value={signUpFields.email}
              onChangeText={(value) => setSignUpFieldHandler('email', value)}
            />
            <MainInputField
              testID='SignUpScreen:PasswordInput'
              placeholder='auth.password'
              icon='lock'
              className='my-7'
              secureTextEntry={!showPassword}
              isPasswordField={true}
              toggleShowPassword={toggleShowPassword}
              value={signUpFields.password}
              onChangeText={(value) => setSignUpFieldHandler('password', value)}
            />
            <MainInputField
              testID='SignUpScreen:ConfirmPasswordInput'
              placeholder='auth.confirmPassword'
              icon='lock'
              className='mb-7'
              secureTextEntry={!showPassword}
              isPasswordField={true}
              toggleShowPassword={toggleShowPassword}
              value={signUpFields.confirmPassword}
              onChangeText={(value) =>
                setSignUpFieldHandler('confirmPassword', value)
              }
            />
            <MainButton
              testID='SignUpScreen:SignUpBtn'
              className='bg-primary dark:bg-brand-800'
              title='auth.signUp'
              isLoading={isLoading}
              onPress={signUpHandler}
            />
            <View className='flex-row justify-between items-center my-5'>
              <View className='w-[44%] h-[1px] bg-neutral-500' />
              <AppText className='w-[12%] text-center uppercase' weight='bold'>
                prepositions.or
              </AppText>
              <View className='w-[44%] h-[1px] bg-neutral-500' />
            </View>
            <MainButton
              className='bg-neutral-100'
              textClassName='text-base text-neutral-900 dark:text-neutral-800'
              title='auth.continue_with_google'
              image={LOCAL_ICONS.GOOGLE}
            />
            <TouchableOpacity
              testID='SignUpScreen:LoginBtn'
              activeOpacity={0.7}
              className='flex-row items-center justify-center mt-8'
              onPress={() => router.replace('/login')}
            >
              <AppText className='me-2 text-neutral-800 dark:text-neutral-500'>
                auth.have_an_account
              </AppText>
              <AppText className='text-primary' weight='semiBold'>
                auth.login
              </AppText>
            </TouchableOpacity>
          </View>
        </ContainerView>
      </ScrollingView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
