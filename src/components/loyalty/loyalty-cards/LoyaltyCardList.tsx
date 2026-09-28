import { JSX, ReactNode } from 'react';
import { FlatList, ImageSourcePropType, View } from 'react-native';
import AppText from '@/components/ui/content/AppText';
import LoyaltyCard from './LoyaltyCard';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';
import { LoyaltyCardTypes } from './types';
import { LOCAL_IMAGES } from '@/constants';

type LoyaltyListProps = {
  loyaltyCardsList: LoyaltyCardTypes[] | undefined;
  threshold: number;
  shopLogo: string | undefined;
};

const LoyaltyCardList = ({
  loyaltyCardsList,
  threshold,
  shopLogo
}: LoyaltyListProps): ReactNode => {
  const renderVoucherItem = ({ item }: { item: LoyaltyCardTypes }) => {
    const loyaltyCardData = {
      ...item,
      loyaltyIcon: LOCAL_IMAGES.LOGO_TRANS,
      shopLogo,
      threshold,
      title: 'app.reward_one_free_haircut',
      description: 'app.redeem_now'
    };
    return <LoyaltyCard {...loyaltyCardData} />;
  };

  const { SCREEN_WIDTH } = useScreenDimensions();

  const CARD_WIDTH = SCREEN_WIDTH * 0.82;
  const SPACING = 16;

  const RenderEmptyCard = () => {
    const initialData = {
      id: '1',
      loyaltyIcon: LOCAL_IMAGES.LOGO_TRANS,
      stamps: 0,
      shopLogo,
      threshold,
      title: 'app.reward_one_free_haircut',
      description: 'app.redeem_now'
    };
    return <LoyaltyCard {...initialData} />;
  };

  return (
    <View className='flex-1 mt-2 pb-20'>
      <AppText
        className='text-left text-lg ps-4 text-brand-500 dark:text-neutral-600'
        weight='semiBold'
      >
        app.your_loyalty_card
      </AppText>
      <FlatList
        testID='LoyaltyCardList:FlatList'
        data={loyaltyCardsList}
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
        ListEmptyComponent={() => <RenderEmptyCard />}
      />
    </View>
  );
};

export default LoyaltyCardList;
