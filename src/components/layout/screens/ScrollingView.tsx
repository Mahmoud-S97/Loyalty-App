import React, { JSX } from 'react';
import { ScrollView } from 'react-native';
import { ScrollingViewProps } from './types';
import { cn } from '@/lib/nativeWindCSS/cn';

const ScrollingView = ({ children, className, horizontal = false, showsHorizontalScrollIndicator = false, showsVerticalScrollIndicator = false }: ScrollingViewProps): JSX.Element => {

    return (
        <ScrollView testID='ScrollingView:View' className={cn('flex-1 grow-1 bg-neutral-100 dark:bg-neutral-900', className)} horizontal={horizontal} showsHorizontalScrollIndicator={showsHorizontalScrollIndicator} showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
            {children}
        </ScrollView>
    )
}

export default ScrollingView;