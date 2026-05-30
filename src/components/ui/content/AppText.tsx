import React, { JSX, ReactNode } from 'react';
import { Text } from 'react-native';
import { cn } from '@/lib/nativeWindCSS/cn';
import { getTranslated } from '@/lib/localization';
import { getFontWeight } from '@/utils';

type AppTextProps = {
  children: string | ReactNode;
  numberOfLines?: number;
  className?: string;
  withTranslation?: boolean;
  tanslationParams?: Record<string, string>;
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
};

const AppText = ({
  children,
  numberOfLines,
  className,
  withTranslation = true,
  tanslationParams,
  weight = 'regular'
}: AppTextProps): JSX.Element => {
  const getFontWeightClases = getFontWeight(weight);
  const renderChildren =
    withTranslation && typeof children === 'string'
      ? getTranslated(children, tanslationParams)
      : children;

  return (
    <Text
      testID='AppText:Text'
      numberOfLines={numberOfLines}
      className={cn(
        'text-neutral-900 dark:text-neutral-500 font-normal text-base',
        getFontWeightClases,
        className
      )}
    >
      {renderChildren}
    </Text>
  );
};

export default AppText;
