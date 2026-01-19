import { APP_COLORS, shadowStyle } from '@/constants/theme';
import { cn } from '@/lib/nativeWindCSS/cn';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { ComponentProps } from 'react';
import { TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { getTranslated } from '@/lib/localization';

type InputFieldProps = {
    icon?: ComponentProps<typeof MaterialIcons>['name'],
    iconSize?: number,
    iconColor?: string,
    showPassword?: boolean,
    className?: string,
    textInputClassName?: string,
    secureTextEntry?: boolean,
    placeholderTextColor?: string,
    placeholder?: string,
    editable?: boolean,
    maxLength?: number,
    multiline?: boolean,
    scrollEnabled?: boolean,
    value?: string,
    onChangeText?: (value: any) => void,
    testID?: string
}

const MainInputField = ({ testID, icon, iconSize, iconColor, showPassword, className, textInputClassName, secureTextEntry, placeholder, placeholderTextColor, editable, maxLength, multiline, scrollEnabled, value, onChangeText }: InputFieldProps) => {

    const scheme = useColorScheme();

    return (
        <View testID='MainInputField:WrapperView' style={shadowStyle(scheme)} className={cn('w-full h-[50px] bg-neutral-50 rounded-full flex-row items-center py-2 px-4', className)}>
            <MaterialIcons name={icon} size={iconSize ?? 24} color={iconColor ?? APP_COLORS.neutral[800]} />
            <TextInput
                testID={testID ?? 'MainInputField:TextInput'}
                className={cn('flex items-center w-[90%] h-[100%] ms-3 font-trans font-medium text-base text-neutral-900 dark:text-neutral-500 dark:bg-neutral-300 rounded-full', textInputClassName)}
                placeholderTextColor={placeholderTextColor ?? APP_COLORS.neutral[800]}
                placeholder={getTranslated(placeholder ?? '')}
                secureTextEntry={secureTextEntry}
                editable={editable}
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength ?? 50}
                multiline={multiline ?? false}
                scrollEnabled={scrollEnabled ?? true}
            />
            {secureTextEntry && (
                <TouchableOpacity testID='MainInputField:ToggleEyeButton' activeOpacity={0.7} className='flex justify-center items-center absolute start-[95%] z-10'>
                    <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={iconSize ?? 20} color={iconColor ?? APP_COLORS.neutral[800]} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default MainInputField;