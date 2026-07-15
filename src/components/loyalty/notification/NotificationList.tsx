import { useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import NotificationCard from './NotificationCard';
import { NotificationItem } from '@/types';
import { APP_COLORS } from '@/constants/theme';
import EmptyStateMessage from '@/components/ui/globals/messages/EmptyStateMessage';
import { cn } from '@/lib/nativeWindCSS/cn';
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import { is_RTL } from '@/utils';

type NotificationListProps = {
  notificationData: NotificationItem[];
};

type NotificationItemProps = {
  index: number;
  item: NotificationItem;
};

const TypedSwipeRow = SwipeRow as any;

const NotificationList = ({ notificationData }: NotificationListProps) => {
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

  const renderNotificationItem = ({ item, index }: NotificationItemProps) => {
    return (
      <TypedSwipeRow
        ref={(ref: any) => {
          rowRefs.current[item.id] = ref;
        }}
        rightOpenValue={is_RTL() ? 0 : -80}
        leftOpenValue={is_RTL() ? 80 : 0}
        disableRightSwipe={!is_RTL()}
        disableLeftSwipe={is_RTL()}
        onRowOpen={() => onRowOpen(item.id)}
      >
        <View className='flex-1 items-end justify-center bg-neutral-50 dark:bg-secondary'>
          {isRowOpened && (
            <TouchableOpacity
              activeOpacity={0.8}
              className='w-1/2 h-full self-end items-end justify-center bg-red-500'
              onPress={() => {}}
            >
              <AppIcon
                type='FontAwesome'
                name='trash-o'
                color={APP_COLORS.neutral[100]}
                size={30}
                className='me-7'
              />
            </TouchableOpacity>
          )}
        </View>
        <NotificationCard
          item={item}
          index={index}
          onPress={() => onRowOpen(item.id)}
        />
      </TypedSwipeRow>
    );
  };

  return (
    <FlatList
      testID='NotificationList:FlatList'
      data={notificationData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderNotificationItem}
      contentContainerClassName={cn(
        'pt-6 pb-24',
        notificationData.length === 0 ? 'grow' : undefined
      )}
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={10}
      removeClippedSubviews
      ListEmptyComponent={
        <EmptyStateMessage
          testID='EmptyStateMessage:Notifications'
          containerClassName='flex-1'
          message='app.no_notifications_yet'
        />
      }
    />
  );
};

export default NotificationList;
