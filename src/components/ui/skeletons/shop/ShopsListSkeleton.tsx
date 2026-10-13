import React, { JSX } from 'react';
import { FlatList } from 'react-native';
import ShopCardSkeleton from './ShopCardSkeleton';

const SKELETON_ITEMS = [1, 2, 3, 4, 5];

const ShopsListSkeleton = (): JSX.Element => {
  return (
    <FlatList
      data={SKELETON_ITEMS}
      keyExtractor={(item) => item.toString()}
      renderItem={() => <ShopCardSkeleton />}
      contentContainerClassName='px-4 pt-6 pb-24'
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={5}
      removeClippedSubviews
    />
  );
};

export default ShopsListSkeleton;
