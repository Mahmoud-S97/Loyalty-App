import { Alert, FlatList, Text } from "react-native";
import WalletCard from "./WalletCard";
import { WalletItem } from "@/types";

type WalletItemTypes = {
  index: number,
  item: WalletItem
}

type WalletListTypes = {
  walletData: WalletItem[]
}

const WalletList = ({ walletData }: WalletListTypes) => {

  const navigationHandler = () => {
    // Will be handled later
    Alert.alert('', 'Navigate to Loyalty-Screen!');
  }

  const renderWalletItem = ({ item, index }: WalletItemTypes) => {
    return (
      <WalletCard index={index} item={item} onPress={navigationHandler} />
    )
  }

  return (
    <FlatList
      testID="WalletList:FlatList"
      data={walletData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderWalletItem}
      contentContainerClassName='px-4 pt-6 pb-24'
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={10}
      removeClippedSubviews
      ListEmptyComponent={() => <Text>No wallet items found</Text>}
    />
  )
}

export default WalletList;