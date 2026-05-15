import { JSX } from 'react';
import { FlatList, View } from 'react-native';
import AppText from '@/components/ui/content/AppText';
import { vouchersList } from '@/dummy-data';
import VoucherCard from './VoucherCard';
import { VoucherCardProps } from './types';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';

const VouchersList = (): JSX.Element => {
  const renderVoucherItem = ({ item }: { item: VoucherCardProps }) => (
    <VoucherCard {...item} />
  );

  const { SCREEN_WIDTH } = useScreenDimensions();

  const CARD_WIDTH = SCREEN_WIDTH * 0.52;
  const SPACING = 16;

  return (
    <View className='flex-1'>
      <AppText
        className='text-start text-lg mt-2 mb-4 font-semibold text-brand-500 dark:text-neutral-600'
        weight='semiBold'
      >
        app.your_vouchers
      </AppText>
      <FlatList
        data={vouchersList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVoucherItem}
        contentContainerStyle={{ gap: SPACING }}
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

export default VouchersList;
