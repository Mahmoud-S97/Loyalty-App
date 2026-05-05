// components/ui/modals/app-sheet.tsx

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';
import { View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  type BottomSheetBackdropProps,
  type BottomSheetModalProps
} from '@gorhom/bottom-sheet';
import { cn } from '@/lib/nativeWindCSS/cn';
import { AppBottomSheetProps, AppBottomSheetRef } from './types';
import { APP_COLORS } from '@/constants/theme';

const AppBottomSheet = forwardRef<AppBottomSheetRef, AppBottomSheetProps>(
  (
    {
      children,
      snapPoints = ['65%', '92%'],
      scrollable = false,
      className,
      contentClassName,
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      detached = false,
      bottomInset = 24,
      onDismiss
    },
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      present: () => {
        bottomSheetRef.current?.present();
      },

      dismiss: () => {
        bottomSheetRef.current?.dismiss();
      },

      snapToIndex: (index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
      },

      close: () => {
        bottomSheetRef.current?.close();
      }
    }));

    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.45}
          pressBehavior='close'
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={memoizedSnapPoints}
        detached={detached}
        bottomInset={bottomInset}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing={enableDynamicSizing}
        onDismiss={onDismiss}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: APP_COLORS.neutral[700],
          width: 60
        }}
        backgroundStyle={{
          backgroundColor: 'transparent'
        }}
      >
        <View
          className={cn(
            'flex-1 overflow-hidden rounded-t-[32px] bg-zinc-100 dark:bg-zinc-900',
            className
          )}
        >
          {scrollable ? (
            <BottomSheetScrollView
              contentContainerStyle={{
                paddingBottom: 40
              }}
              className={cn('flex-1 p-6', contentClassName)}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </BottomSheetScrollView>
          ) : (
            <BottomSheetView className={cn('flex-1 p-6', contentClassName)}>
              {children}
            </BottomSheetView>
          )}
        </View>
      </BottomSheetModal>
    );
  }
);

AppBottomSheet.displayName = 'AppBottomSheet';

export default AppBottomSheet;
