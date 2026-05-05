export interface AppBottomSheetRef {
  present: () => void;
  dismiss: () => void;
  snapToIndex: (index: number) => void;
  close: () => void;
}

export interface AppBottomSheetProps {
  children: React.ReactNode;

  snapPoints?: (string | number)[];

  title?: string;

  scrollable?: boolean;

  className?: string;

  contentClassName?: string;

  backdropClassName?: string;

  enablePanDownToClose?: boolean;

  enableDynamicSizing?: boolean;

  detached?: boolean;

  bottomInset?: number;

  onDismiss?: () => void;
}
