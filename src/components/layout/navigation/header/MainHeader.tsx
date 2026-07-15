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
  withGoBackButton = true,
  withTranslation = true
}: MainHeaderProps) => {
  const renderTitle = withTranslation ? getTranslated(title || '') : title;

  const hasEndComponent = !!endComponent;

  return (
    <View
      testID='MainHeader:View:Container'
      className={cn(
        'w-full h-[70] flex flex-row items-center gap-8 p-4 bg-neutral-50 dark:bg-brand-400 border-b border-neutral-700',
        hasEndComponent ? 'justify-between gap-0' : undefined,
        className
      )}
    >
      {withGoBackButton && (
        <GoBackButton testID='MainHeader:GoBackButton' className='m-0' />
      )}
      {startComponent}
      {title && (
        <Text
          testID='MainHeader:Text:Title'
          className={cn(
            'text-center text-xl font-medium text-neutral-900',
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
