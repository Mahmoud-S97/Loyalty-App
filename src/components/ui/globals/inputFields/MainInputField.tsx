import React, { ComponentProps } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { APP_COLORS } from '@/constants/theme';
import { cn } from '@/lib/nativeWindCSS/cn';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getTranslated } from '@/lib/localization';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import AppIcon from '../icons/AppIcon';
import { AppFontWeight, getFontWeight, is_RTL } from '@/utils';

type InputFieldProps = {
  testID?: string;
  icon?: ComponentProps<typeof MaterialIcons>['name'];
  iconSize?: number;
  iconColor?: string;
  className?: string;
  withShadow?: boolean;
  withIcon?: boolean;
  textInputClassName?: string;
  secureTextEntry?: boolean;
  isPasswordField?: boolean;
  placeholderTextColor?: string;
  placeholder?: string;
  editable?: boolean;
  maxLength?: number;
  multiline?: boolean;
  scrollEnabled?: boolean;
  value?: string;
  onChangeText?: (value: any) => void;
  toggleShowPassword?: () => void;
  weight?: AppFontWeight
};

const MainInputField = ({
  testID,
  icon,
  iconSize,
  iconColor,
  className,
  withShadow = true,
  withIcon = true,
  textInputClassName,
  secureTextEntry,
  isPasswordField,
  placeholder,
  placeholderTextColor,
  editable,
  maxLength,
  multiline,
  scrollEnabled,
  value,
  onChangeText,
  toggleShowPassword,
  weight = 'medium'
}: InputFieldProps) => {
  const { is_dark } = useAppTheme();
  const { shadow } = useThemeStyles();
  const applyShadow = withShadow ? shadow : {};

  return (
    <View
      testID='MainInputField:WrapperView'
      style={applyShadow}
      className={cn(
        'w-full h-[55px] bg-neutral-50 dark:bg-neutral-800 rounded-full flex-row items-center px-4',
        className
      )}
    >
      {withIcon && (
        <MaterialIcons
          name={icon}
          size={iconSize ?? 24}
          color={
            iconColor ||
            (is_dark ? APP_COLORS.neutral[400] : APP_COLORS.neutral[800])
          }
        />
      )}
      <TextInput
        testID={testID ?? 'MainInputField:TextInput'}
        className={cn(
        'w-[90%] h-full ms-3 text-base text-neutral-900 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 rounded-full',
          textInputClassName
        )}
        placeholderTextColor={
          placeholderTextColor ??
          (is_dark ? APP_COLORS.neutral[400] : APP_COLORS.neutral[800])
        }
        placeholder={getTranslated(placeholder ?? '')}
        secureTextEntry={secureTextEntry}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength ?? 50}
        multiline={multiline ?? false}
        scrollEnabled={scrollEnabled ?? true}
        style={{
          writingDirection: is_RTL() ? 'rtl' : 'ltr',
          textAlign: is_RTL() ? 'right' : 'left',
          fontFamily: getFontWeight(weight)
        }}
      />
      {isPasswordField && (
        <TouchableOpacity
          testID='MainInputField:ToggleEyeButton'
          activeOpacity={0.7}
          className='flex justify-center items-center absolute start-[95%] z-10'
          onPress={toggleShowPassword}
        >
          <AppIcon
            type='FontAwesome5'
            name={!secureTextEntry ? 'eye' : 'eye-slash'}
            size={iconSize ?? 20}
            color={
              iconColor ||
              (is_dark ? APP_COLORS.neutral[400] : APP_COLORS.neutral[800])
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MainInputField;
