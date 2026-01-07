import React, { JSX } from 'react';
import { View } from 'react-native';
import { ViewProps } from './types';
import { cn } from '@/lib/nativeWindCSS/cn';

const ScreenView = ({ children, className }: ViewProps): JSX.Element => {

    return (
        <View className={cn('flex-1 bg-neutral-100 dark:bg-neutral-900', className)}>
            {children}
        </View>
    )
}

export default ScreenView;