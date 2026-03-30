import React, { JSX } from 'react';
import { Text } from 'react-native';
import { cn } from '@/lib/nativeWindCSS/cn';
import { getTranslated } from '@/lib/localization';
import { getFontWeight, is_RTL } from '@/utils';

type AppTextProps = {
  children: any,
  numberOfLines?: number,
  className?: string,
  withTranslation?: boolean,
  weight?: string
}

const AppText = ({ children, numberOfLines, className, withTranslation = true, weight = 'regular' }: AppTextProps): JSX.Element => {

  const getFontWeightClases = getFontWeight(weight);
  const renderChildren = withTranslation ? getTranslated(children) : children;

  return (
    <Text testID='AppText:Text' numberOfLines={numberOfLines} className={cn('text-neutral-900 dark:text-neutral-500 font-normal text-base', getFontWeightClases, className)}>{renderChildren}</Text>
  )
}

export default AppText;