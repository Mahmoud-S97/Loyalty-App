import React, { ReactNode, ComponentProps } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  TouchableOpacity
} from 'react-native';
import { LOCAL_ICONS } from '@/constants/icons';
import { getTranslated } from '@/lib/localization';
import { cn } from '@/lib/nativeWindCSS/cn';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { APP_COLORS, shadowStyle } from '@/constants/theme';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import { AppFontWeight, getFontWeight } from '@/utils';

type MainButtonProps = {
  testID?: string;
  children?: string | ReactNode;
  title?: string;
  icon?: ComponentProps<typeof MaterialIcons>['name'];
  image?: ImageSourcePropType;
  className?: string;
  textClassName?: string;
  imageClassName?: string;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  weight?: AppFontWeight;
};

const MainButton = ({
  testID,
  children,
  title,
  icon,
  image,
  className,
  textClassName,
  imageClassName,
  iconSize,
  iconColor,
  disabled,
  isLoading,
  onPress,
  weight = 'semiBold'
}: MainButtonProps) => {
  const { shadow } = useThemeStyles();

  const combinedClasses = disabled ? className + ' !opacity-60' : className;
  const combinedTextClasses = disabled
    ? textClassName + ' text-neutral-200'
    : textClassName;

  return (
    <TouchableOpacity
      testID={testID ?? 'MainButton:Button'}
      style={shadow}
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      onPress={onPress}
      className={cn(
        'flex-row w-full h-[55px] justify-center items-center bg-neutral-100 rounded-full',
        combinedClasses
      )}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color={'#ABABAB'} />
      ) : (
        <>
          {icon && (
            <MaterialIcons
              name={icon}
              size={iconSize || 24}
              color={iconColor || APP_COLORS.neutral[900]}
            />
          )}
          {image && (
            <Image
              testID='MainButton:Image'
              source={image}
              className={cn('w-7 h-7 object-contain', imageClassName)}
            />
          )}
          {children && children}
          <Text
            className={cn(
              'text-lg text-center text-neutral-200 dark:text-neutral-400 ms-2',
              combinedTextClasses
            )}
            style={{
              fontFamily: getFontWeight(weight)
            }}
          >
            {getTranslated(title || '')}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default MainButton;
