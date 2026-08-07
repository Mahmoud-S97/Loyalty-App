import React, { PropsWithChildren } from 'react';
import { Modal, View, ModalBaseProps } from 'react-native';
import { cn } from '@/lib/nativeWindCSS/cn';

type MainLoyaltyModalProps = ModalBaseProps & {
  className?: string;
};

const MainLoyaltyModal = (props: PropsWithChildren<MainLoyaltyModalProps>) => {
  return (
    <Modal {...props}>
      <View
        className={cn(
          'flex-1 items-center justify-center bg-black/55 dark:bg-black/80 px-6',
          props.className
        )}
      >
        <View className='w-full max-w-[360px] items-center rounded-3xl bg-neutral-50 dark:bg-neutral-900 px-6 py-7'>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

export default MainLoyaltyModal;
