import { TouchableOpacity, Text } from "react-native";

type NotificationCardProps = {
  item: { id: number, title: string },
  onPress?: () => void
}

const NotificationCard = ({ item: { id, title }, onPress }: NotificationCardProps) => {
  return (
    <TouchableOpacity testID={`NotificationList:NotificationCard-${id}`} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default NotificationCard;