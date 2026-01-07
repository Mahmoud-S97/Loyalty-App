import React, { ReactNode, ComponentProps } from 'react';
import { Image, ImageSourcePropType, Platform, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { LOCAL_ICONS } from '@/constants/icons';
import { getTranslated } from '@/lib/localization';
import { cn } from '@/lib/nativeWindCSS/cn';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { APP_COLORS, shadowStyle } from '@/constants/theme';

type MainButtonProps = {
    children?: string | ReactNode,
    title?: string,
    icon?: ComponentProps<typeof MaterialIcons>['name'],
    image?: ImageSourcePropType,
    className?: string,
    textClassName?: string,
    imageClassName?: string,
    iconSize?: number,
    iconColor?: string,
    disabled?: boolean,
    onPress?: () => void
}

const MainButton = ({ children, title, icon, image, className, textClassName, imageClassName, iconSize, iconColor, disabled, onPress }: MainButtonProps) => {
    const scheme = useColorScheme();
    return (
        <TouchableOpacity style={shadowStyle(scheme)} activeOpacity={0.7} disabled={disabled} onPress={onPress} className={cn('flex-row w-full h-[50px] justify-center items-center bg-neutral-100 rounded-full', className)}>
            {icon && <MaterialIcons name={icon} size={iconSize || 24} color={iconColor || APP_COLORS.neutral[900]} />}
            {image && <Image source={image} className={cn('w-7 h-7 object-contain', imageClassName)} />}
            {children && children}
            <Text className={cn('text-lg text-center font-trans font-bold text-neutral-200 dark:text-neutral-400 ms-2', textClassName)}>{getTranslated(title || '')}</Text>
        </TouchableOpacity>
    )
}

export default MainButton;