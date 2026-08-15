import React, { JSX } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { getTranslated } from '@/lib/localization';
import { getFontWeight } from '@/utils';

const Spinner = (): JSX.Element => {
  return (
    <View className='absolute inset-0 z-50 items-center justify-center bg-black/40'>
      <View className='items-center justify-center rounded-2xl bg-black/70 px-8 py-6'>
        <ActivityIndicator size='large' color='#fafafa' />

        <Text
          className='mt-3 text-base font-medium text-neutral-50'
          style={{ fontFamily: getFontWeight('semiBold') }}
        >
          {getTranslated('common.loading')}
        </Text>
      </View>
    </View>
  );
};

export default Spinner;
