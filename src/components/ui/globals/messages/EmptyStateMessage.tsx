import { memo, PropsWithChildren } from 'react';
import { View } from 'react-native';

import AppText from '@/components/ui/content/AppText';
import { AppTextProps } from '@/components/ui/content/AppText';
import { cn } from '@/lib/nativeWindCSS/cn';

interface EmptyStateMessageProps
  extends PropsWithChildren, Omit<AppTextProps, 'children'> {
  testID?: string;
  message?: string;
  containerClassName?: string;
}

const EmptyStateMessage = ({
  children,
  testID,
  message = 'app.no_data_found',
  containerClassName,
  ...textProps
}: EmptyStateMessageProps) => {
  return (
    <View
      testID={testID || 'EmptyStateMessage:Container'}
      className={cn(
        'flex items-center justify-center self-stretch',
        containerClassName
      )}
    >
      {children ? (
        children
      ) : (
        <AppText
          className='text-center font-medium text-xl italic text-neutral-500 dark:text-neutral-400'
          {...textProps}
          weight='medium'
        >
          {message}
        </AppText>
      )}
    </View>
  );
};

export default memo(EmptyStateMessage);
