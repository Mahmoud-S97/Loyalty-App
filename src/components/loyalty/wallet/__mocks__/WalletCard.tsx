import { WalletItem } from "@/types";
import { TouchableOpacity, Text } from "react-native";

type WalletCardProps = {
  item: { id: number, name: string },
  onPress?: () => void
}

const WalletCard = ({ item: { id, name }, onPress }: WalletCardProps) => {
  return (
    <TouchableOpacity testID={`WalletList:WalletCard-${id}`} onPress={onPress}>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

export default WalletCard;