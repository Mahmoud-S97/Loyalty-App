import { JSX } from 'react';
import {
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  View
} from 'react-native';
import AppText from '@/components/ui/content/AppText';
import VoucherCard from './VoucherCard';
import { LoyaltyCard } from './types';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';
import { LOCAL_IMAGES } from '@/constants';
import EmptyStateMessage from '@/components/ui/globals/messages/EmptyStateMessage';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';

type VouchersListProps = {
  vouchersList: LoyaltyCard[] | undefined;
};

type VouchersItemProps = {
  id: string;
  stamps: number;
  image: ImageSourcePropType | undefined;
  title?: string;
  description?: string;
};

const VouchersList = ({ vouchersList }: VouchersListProps): JSX.Element => {
  const { cardShadow } = useThemeStyles();

  const renderVoucherItem = ({ item }: { item: LoyaltyCard }) => {
    const redeemableVoucher: VouchersItemProps = {
      ...item,
      image: LOCAL_IMAGES.REDEEMING_VOUCHER,
      title: 'app.reward_one_free_haircut',
      description: 'app.redeem_now'
    };
    return <VoucherCard {...redeemableVoucher} />;
  };

  const { SCREEN_WIDTH } = useScreenDimensions();

  const CARD_WIDTH = SCREEN_WIDTH * 0.52;
  const SPACING = 16;

  return (
    <View className='flex-1'>
      <AppText
        className='text-left text-lg ps-4 text-brand-500 dark:text-neutral-600'
        weight='semiBold'
      >
        app.your_vouchers
      </AppText>
      <FlatList
        testID='VouchersList:FlatList'
        data={vouchersList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVoucherItem}
        contentContainerStyle={{ gap: SPACING }}
        contentContainerClassName='px-4 py-6'
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
        ListEmptyComponent={
          <EmptyStateMessage
            containerClassName='flex-1 border-neutral-500 dark:border-neutral-700 rounded-xl'
            style={[cardShadow, { borderWidth: 0.5, width: CARD_WIDTH }]}
          >
            <ImageBackground
              source={LOCAL_IMAGES.EMPTY_VOUCHER}
              className='w-full h-[160px] relative rounded-xl flex items-center justify-start pt-6 overflow-hidden'
              resizeMode='cover'
              alt='Not vouchers yet.'
            >
              <AppText className='text-lg text-center !text-neutral-800 italic capitalize' weight='bold'>
                app.no_vouchers_yet
              </AppText>
            </ImageBackground>
          </EmptyStateMessage>
        }
      />
    </View>
  );
};

export default VouchersList;
