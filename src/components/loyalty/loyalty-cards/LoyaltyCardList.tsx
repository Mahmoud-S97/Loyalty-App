import { JSX } from 'react';
import { FlatList, View } from 'react-native';
import AppText from '@/components/ui/content/AppText';
import { loyaltyCardsData, vouchersList } from '@/dummy-data';
import LoyaltyCard from './LoyaltyCard';
import { VoucherCardProps } from './types';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';

const LoyaltyCardList = (): JSX.Element => {
  const renderVoucherItem = ({ item }: { item: VoucherCardProps }) => (
    <LoyaltyCard {...item} />
  );

  const { SCREEN_WIDTH } = useScreenDimensions();

  const CARD_WIDTH = SCREEN_WIDTH * 0.82;
  const SPACING = 16;

  return (
    <View className='flex-1 mt-2 pb-20'>
      <AppText
        className='text-start text-lg ps-4 font-semibold text-brand-500 dark:text-neutral-600'
        weight='semiBold'
      >
        app.your_loyalty_card
      </AppText>
      <FlatList
        data={loyaltyCardsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVoucherItem}
        contentContainerStyle={{ gap: SPACING }}
        contentContainerClassName='px-4 pt-4 pb-14'
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        decelerationRate='fast'
        disableIntervalMomentum
        pagingEnabled={false}
        snapToInterval={CARD_WIDTH + SPACING}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

export default LoyaltyCardList;
