import React, { JSX } from 'react';
import { Text } from 'react-native';
import { cn } from '@/lib/nativeWindCSS/cn';
import { getTranslated } from '@/lib/localization';

type AppTextProps = {
    children: any,
    numberOfLines?: number,
    className?: string,
    withTranslation?: boolean
}

const AppText = ({ children, numberOfLines, className, withTranslation = true }: AppTextProps): JSX.Element => {

    const renderChildren = withTranslation ? getTranslated(children) : children;

    return (
        <Text testID='AppText:Text' numberOfLines={numberOfLines} className={cn('text-neutral-900 dark:text-neutral-500 font-normal text-base font-sans', className)}>{renderChildren}</Text>
    )
}

export default AppText;