import React, { JSX } from 'react';
import { ScrollView } from 'react-native';
import { ScrollingViewProps } from './types';
import { cn } from '@/lib/nativeWindCSS/cn';

const ScrollingView = ({ children, className, showsHorizontalScrollIndicator = false, showsVerticalScrollIndicator = false }: ScrollingViewProps): JSX.Element => {

    return (
        <ScrollView className={cn('flex-1 grow-1 bg-neutral-100 dark:bg-neutral-900', className)} showsVerticalScrollIndicator={showsHorizontalScrollIndicator} showsHorizontalScrollIndicator={showsVerticalScrollIndicator}>
            {children}
        </ScrollView>
    )
}

export default ScrollingView;