import { FlatList, Text } from 'react-native';
import { router } from 'expo-router';
import WalletCard from './WalletCard';
import { WalletItem } from './types';

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
      contentContainerClassName='px-4 pt-6 pb-24'
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={10}
      removeClippedSubviews
      ListEmptyComponent={() => <Text>No wallet items found</Text>}
    />
  );
};

export default WalletList;
