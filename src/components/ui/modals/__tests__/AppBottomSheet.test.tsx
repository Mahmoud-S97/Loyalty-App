import React, { createRef } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { render } from '@testing-library/react-native';
import AppBottomSheet from '../AppBottomSheet';

/* -------------------------------------------------------------------------- */
/*                               Mock Functions                               */
/* -------------------------------------------------------------------------- */

const mockPresent = jest.fn();
const mockDismiss = jest.fn();
const mockSnapToIndex = jest.fn();
const mockClose = jest.fn();

/* -------------------------------------------------------------------------- */
/*                              Bottom Sheet Mock                             */
/* -------------------------------------------------------------------------- */

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View, ScrollView } = require('react-native');

  const BottomSheetModal = React.forwardRef(({ children }: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      present: mockPresent,
      dismiss: mockDismiss,
      snapToIndex: mockSnapToIndex,
      close: mockClose
    }));

    return <View testID='MockBottomSheetModal'>{children}</View>;
  });

  return {
    BottomSheetModal,

    BottomSheetBackdrop: (props: any) => <View {...props} />,

    BottomSheetView: (props: any) => (
      <View testID='AppBottomSheet:View' {...props} />
    ),

    BottomSheetScrollView: (props: any) => (
      <ScrollView testID='AppBottomSheet:ScrollView' {...props} />
    )
  };
});

describe('<AppBottomSheet />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders container', () => {
    const { getByTestId } = render(
      <AppBottomSheet>
        <Text>Content</Text>
      </AppBottomSheet>
    );

    expect(getByTestId('AppBottomSheet:Container')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <AppBottomSheet>
        <Text>Bottom Sheet Content</Text>
      </AppBottomSheet>
    );

    expect(getByText('Bottom Sheet Content')).toBeTruthy();
  });

  it('renders BottomSheetView by default', () => {
    const { getByTestId } = render(
      <AppBottomSheet>
        <Text>Content</Text>
      </AppBottomSheet>
    );

    expect(getByTestId('AppBottomSheet:View')).toBeTruthy();
  });

  it('renders BottomSheetScrollView when scrollable=true', () => {
    const { getByTestId } = render(
      <AppBottomSheet scrollable>
        <Text>Scrollable Content</Text>
      </AppBottomSheet>
    );

    expect(getByTestId('AppBottomSheet:ScrollView')).toBeTruthy();
  });

  it('calls present through forwarded ref', () => {
    const ref = createRef<any>();

    render(
      <AppBottomSheet ref={ref}>
        <Text>Content</Text>
      </AppBottomSheet>
    );

    ref.current.present();

    expect(mockPresent).toHaveBeenCalledTimes(1);
  });

  it('calls dismiss through forwarded ref', () => {
    const ref = createRef<any>();

    render(
      <AppBottomSheet ref={ref}>
        <Text>Content</Text>
      </AppBottomSheet>
    );

    ref.current.dismiss();

    expect(mockDismiss).toHaveBeenCalledTimes(1);
  });

  it('calls close through forwarded ref', () => {
    const ref = createRef<any>();

    render(
      <AppBottomSheet ref={ref}>
        <Text>Content</Text>
      </AppBottomSheet>
    );

    ref.current.close();

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('calls snapToIndex through forwarded ref', () => {
    const ref = createRef<any>();

    render(
      <AppBottomSheet ref={ref}>
        <Text>Content</Text>
      </AppBottomSheet>
    );

    ref.current.snapToIndex(1);

    expect(mockSnapToIndex).toHaveBeenCalledWith(1);
  });
});
