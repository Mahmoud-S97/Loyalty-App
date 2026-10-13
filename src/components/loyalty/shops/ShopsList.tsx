import { FlatList, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import ShopCard from './ShopCard';
import { ShopItem } from './types';
import EmptyStateMessage from '@/components/ui/globals/messages/EmptyStateMessage';
import { cn } from '@/lib/nativeWindCSS/cn';
import { LOCAL_IMAGES } from '@/constants';
import AppText from '@/components/ui/content/AppText';
import { ShopDto } from '@/types';
import { getShopIsOpen } from '@/utils';

type ShopItemProps = {
  index: number;
  item: ShopDto;
};

type ShopsListProps = {
  shops: ShopDto[];
};

const renderShopItem = ({ item, index }: ShopItemProps) => {
  const isOpen = getShopIsOpen(item.openingHours);
  const shopItem: ShopItem = {
    id: item.id,
    name: item.name,
    logo: item.logo,
    coverImage: item.coverImage,
    description: item.description,
    category: item.category,
    specialties: item.specialties,
    address: {
      address1: item.address.address1,
      address2: item.address?.address2
    },
    isOpen: isOpen
  };
  return <ShopCard index={index} item={shopItem} />;
};

const ShopsList = ({ shops }: ShopsListProps) => {
  return (
    <FlatList
      testID='ShopsList:FlatList'
      data={shops}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderShopItem}
      contentContainerClassName={cn(
        'px-4 pt-6 pb-24',
        shops.length === 0 ? 'grow' : undefined
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
              <AppText className='text-2xl text-center' weight='bold'>
                app.empty_shops_msg
              </AppText>
            </View>
          </View>
        </EmptyStateMessage>
      }
    />
  );
};

export default ShopsList;
