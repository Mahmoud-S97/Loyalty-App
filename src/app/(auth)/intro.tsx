import React from 'react';
import { Image, View } from 'react-native';
import { router } from 'expo-router';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import ScrollingView from '@/components/layout/screens/ScrollingView';
import { LOCAL_IMAGES } from '@/constants/images';
import { LOCAL_ICONS } from '@/constants/icons';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const IntroScreen = () => {

    return (
        <ScrollingView>
            <ContainerView>
                <View testID='IntroScreen:HeroSection' className='flex w-full justify-center items-center my-20'>
                    <Image testID='IntroScreen:LogoImage' source={LOCAL_IMAGES.LOGO_TRANS} className='w-[120px] h-[120px] border-[1px] border-neutral-500 dark:border-neutral-800 rounded-lg' />
                    <AppText className='text-2xl text-center font-trans  font-[600] mt-5'>welcome</AppText>
                </View>
                <View testID='IntroScreen:NavigationSection' className='flex-column w-full items-center justify-center p-2' >
                    <MainButton testID='IntroScreen:LoginBtn' className='bg-primary dark:bg-brand-800' title='auth.login' onPress={() => router.replace('/login')} />
                    <MainButton testID='IntroScreen:SignUpBtn' className='bg-neutral-700 mt-8' title='auth.signUp' onPress={() => router.replace('/sign-up')} />
                    <View className='flex-row justify-between items-center my-5'>
                        <View className='w-[44%] h-[1px] bg-neutral-500' />
                        <AppText className='w-[12%] text-center uppercase'>prepositions.or</AppText>
                        <View className='w-[44%] h-[1px] bg-neutral-500' />
                    </View>
                    <MainButton className='bg-neutral-100 dark:bg-neutral-300' textClassName='text-neutral-900 dark:text-neutral-800 font-medium' title='auth.continue_with_google' image={LOCAL_ICONS.GOOGLE} />
                </View>
            </ContainerView>
        </ScrollingView>

    )
}

export default IntroScreen;