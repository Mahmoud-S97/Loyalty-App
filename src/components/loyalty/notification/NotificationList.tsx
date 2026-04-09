import { useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import { FontAwesome } from "@expo/vector-icons";
import NotificationCard from "./NotificationCard";
import { NotificationItem } from "@/types";
import { APP_COLORS } from "@/constants/theme";


type NotificationListTypes = {
  notificationData: NotificationItem[]
}

type NotificationItemTypes = {
  index: number,
  item: NotificationItem
}

const TypedSwipeRow = SwipeRow as any;

const NotificationList = ({ notificationData }: NotificationListTypes) => {

  const [isRowOpened, setIsRowOpened] = useState<boolean>(false);
  const rowRefs = useRef<Record<string, SwipeRow<any> | null>>({});
  const openRowKey = useRef<string | null>(null);

  const onRowOpen = (key: any) => {
    setIsRowOpened(true);
    if (openRowKey.current && openRowKey.current !== key) {
      rowRefs.current[openRowKey.current]?.closeRow();
    }
    openRowKey.current = key;
  };

  const renderNotificationItem = ({ item, index }: NotificationItemTypes) => {
    return (
      <TypedSwipeRow ref={(ref: any) => {
        rowRefs.current[item.id] = ref;
      }} rightOpenValue={-80} disableRightSwipe={true} onRowOpen={() => onRowOpen(item.id)}>
        <View className="flex-1 items-end justify-center bg-neutral-50 dark:bg-secondary">
          {isRowOpened && (
            <TouchableOpacity activeOpacity={0.8} className="w-1/2 h-full self-end items-end justify-center bg-red-500" onPress={() => { }}>
              <FontAwesome name='trash-o' color={APP_COLORS.neutral[100]} size={30} className="me-7" />
            </TouchableOpacity>
          )}
        </View>
        <NotificationCard item={item} index={index} onPress={() => onRowOpen(item.id)} />
      </TypedSwipeRow>
    )
  }

  return (
    <FlatList
      testID="NotificationList:FlatList"
      data={notificationData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderNotificationItem}
      contentContainerClassName=' pt-6 pb-24'
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={10}
      removeClippedSubviews
      ListEmptyComponent={() => <Text>No wallet items found</Text>}
    />
  )
}

export default NotificationList;