import React, { JSX, ReactNode } from 'react';
import { Text } from 'react-native';
import { cn } from '@/lib/nativeWindCSS/cn';
import { getTranslated } from '@/lib/localization';
import { AppFontWeight, getFontWeight } from '@/utils';
import { useAppFonts } from '@/Hooks/typography/useAppFonts';
export interface AppTextProps {
  children: string | ReactNode;
  numberOfLines?: number;
  className?: string;
  style?: Record<any, any>;
  withTranslation?: boolean;
  translationParams?: Record<string, string>;
  weight?: AppFontWeight;
}

const AppText = ({
  children,
  numberOfLines,
  className,
  style,
  withTranslation = true,
  translationParams,
  weight = 'regular'
}: AppTextProps): JSX.Element => {
  const renderChildren =
    withTranslation && typeof children === 'string'
      ? getTranslated(children, translationParams)
      : children;

  return (
    <Text
      testID='AppText:Text'
      numberOfLines={numberOfLines}
      className={cn(
        'text-neutral-900 dark:text-neutral-500 text-base',
        className
      )}
      style={[
        {
          fontFamily: getFontWeight(weight)
        },
        style
      ]}
    >
      {renderChildren}
    </Text>
  );
};

export default AppText;
