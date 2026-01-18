import React, { JSX } from 'react';
import { Text } from 'react-native';
import { cn } from '@/lib/nativeWindCSS/cn';
import { getTranslated } from '@/lib/localization';

type AppTextProps = {
    children: string,
    className?: string
}

const AppText = ({ children, className }: AppTextProps): JSX.Element => {

    return (
        <Text testID='AppText:Text' className={cn('text-neutral-900 dark:text-neutral-500 font-normal text-base font-sans', className)}>{getTranslated(children)}</Text>
    )
}

export default AppText;