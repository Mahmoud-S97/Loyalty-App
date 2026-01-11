import React, { JSX } from 'react';
import { View } from 'react-native';
import { ViewProps } from './types';
import { cn } from '@/lib/nativeWindCSS/cn';

const ContainerView = ({ children, className }: ViewProps): JSX.Element => {

    return (
        <View testID='ContainerView:View' className={cn('flex-1 px-4 py-10 items-center justify-center', className)}>
            {children}
        </View>
    )
}

export default ContainerView;