import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { APP_COLORS, shadowStyle } from '@/constants/theme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { cn } from '@/lib/nativeWindCSS/cn';

type GoBackButtonProps = {
    className?: string,
    iconSize?: number,
    iconColor?: string,
    onPress?: () => void
}

const GoBackButton = ({ className, iconSize, iconColor, onPress }: GoBackButtonProps) => {

    const scheme = useColorScheme();
    const router = useRouter();

    const goBackHandler = () => router.back();

    if(!router.canGoBack()) return null;

    return (
        <TouchableOpacity testID='GoBackButton:Button' activeOpacity={0.6} style={shadowStyle(scheme)} className={cn('w-[45px] h-[45px] m-5 flex justify-center items-center rounded-full bg-neutral-50 dark:bg-neutral-800', className)} onPress={onPress || goBackHandler}>
            <FontAwesome5
                name='chevron-left'
                size={iconSize || 20}
                color={iconColor || (scheme === 'dark' ? APP_COLORS.neutral[200] : APP_COLORS.neutral[900])}
            />
        </TouchableOpacity>
    )
}

export default GoBackButton;