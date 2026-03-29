import { useFonts } from 'expo-font';

export const useAppFonts = () => {
  return useFonts({
    InterRegular: require('@/assets/fonts/Inter-Regular.ttf'),
    InterMedium: require('@/assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('@/assets/fonts/Inter-SemiBold.ttf'),
    InterBold: require('@/assets/fonts/Inter-Bold.ttf'),
    CairoRegular: require('@/assets/fonts/Cairo-Regular.ttf'),
    CairoMedium: require('@/assets/fonts/Cairo-Medium.ttf'),
    CairoSemiBold: require('@/assets/fonts/Cairo-SemiBold.ttf'),
    CairoBold: require('@/assets/fonts/Cairo-Bold.ttf'),
  })
}