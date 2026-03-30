import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { cn } from '@/lib/nativeWindCSS/cn';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';

type GoBackButtonProps = {
  className?: string,
  iconSize?: number,
  iconColor?: string,
  onPress?: () => void
}

const GoBackButton = ({ className, iconSize, iconColor, onPress }: GoBackButtonProps) => {

  const router = useRouter();
  const { currentThemeColor } = useAppTheme();
  const { shadow } = useThemeStyles();

  const goBackHandler = () => router.back();

  if (!router.canGoBack()) return null;

  return (
    <TouchableOpacity testID='GoBackButton:Button' activeOpacity={0.6} style={shadow} className={cn('w-[45px] h-[45px] m-5 flex justify-center items-center rounded-full bg-neutral-50 dark:bg-neutral-800', className)} onPress={onPress || goBackHandler}>
      <FontAwesome5
        name='chevron-left'
        size={iconSize || 20}
        color={iconColor || currentThemeColor}
      />
    </TouchableOpacity>
  )
}

export default GoBackButton;