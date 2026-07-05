import { FlatList, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import WalletCard from './WalletCard';
import { WalletItem } from './types';
import EmptyStateMessage from '@/components/ui/globals/messages/EmptyStateMessage';
import { cn } from '@/lib/nativeWindCSS/cn';
import { LOCAL_IMAGES } from '@/constants';
import AppText from '@/components/ui/content/AppText';

type WalletItemProps = {
  index: number;
  item: WalletItem;
};

type WalletListProps = {
  userWallet: WalletItem[];
};

const WalletList = ({ userWallet }: WalletListProps) => {
  const renderWalletItem = ({ item, index }: WalletItemProps) => {
    return <WalletCard index={index} item={item} />;
  };

  return (
    <FlatList
      testID='WalletList:FlatList'
      data={userWallet}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderWalletItem}
      contentContainerClassName={cn(
        'px-4 pt-6 pb-24',
        userWallet.length === 0 ? 'grow' : undefined
      )}
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={10}
      removeClippedSubviews
      ListEmptyComponent={
        <EmptyStateMessage containerClassName='flex-1'>
          <View className='flex-1 items-center justify-center'>
            <Image
              source={LOCAL_IMAGES.EMPTY_WALLET}
              alt='No Loyalty Cards Yet!.'
              style={{ width: 250, height: 200, borderRadius: 20 }}
            />
            <View className='flex flex-col gap-3 justify-center items-center mt-6'>
              <AppText className='text-2xl font-bold text-center' weight='bold'>
                app.empty_wallet_msg
              </AppText>
              <AppText
                className='text-lg font-medium text-center leading-7'
                weight='medium'
              >
                app.empty_wallet_encouragement_msg
              </AppText>
            </View>
          </View>
        </EmptyStateMessage>
      }
    />
  );
};

export default WalletList;
