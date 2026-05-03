import React from 'react';
import GoBackButton from '@/components/ui/globals/buttons/GoBackButton';
import { Text, View } from 'react-native';
import { cn } from '@/lib/nativeWindCSS/cn';
import { getTranslated } from '@/lib/localization';

type MainHeaderProps = {
  className?: string;
  textClassName?: string;
  title?: string;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  withGoBackButton?: boolean;
  withTranslation?: boolean;
};

const MainHeader = ({
  className,
  textClassName,
  title,
  startComponent,
  endComponent,
  withGoBackButton,
  withTranslation = true
}: MainHeaderProps) => {
  const renderTitle = withTranslation ? getTranslated(title || '') : title;

  return (
    <View
      className={cn(
        'w-full h-[70] flex flex-row items-center justify-between p-4 bg-neutral-50 dark:bg-brand-400 border-b border-neutral-700',
        className
      )}
    >
      {withGoBackButton && <GoBackButton className="m-0" />}
      {startComponent}
      {title && (
        <Text
          className={cn(
            'w-[60%] text-center text-xl font-medium text-neutral-900',
            textClassName
          )}
          numberOfLines={1}
        >
          {renderTitle}
        </Text>
      )}
      {endComponent}
    </View>
  );
};

export default MainHeader;
