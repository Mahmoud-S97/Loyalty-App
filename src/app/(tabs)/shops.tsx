import React, { JSX } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenView from '@/components/layout/screens/ScreenView';
import MainHeader from '@/components/layout/navigation/header/MainHeader';
import MainInputField from '@/components/ui/globals/inputFields/MainInputField';
import AppText from '@/components/ui/content/AppText';
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';
import { APP_COLORS } from '@/constants/theme';
import { useShops } from '@/Hooks/shops/useShops';
import ShopsList from '@/components/loyalty/shops/ShopsList';
import ShopsListSkeleton from '@/components/ui/skeletons/shop/ShopsListSkeleton';

const ShopsScreens = (): JSX.Element => {
  const { is_dark } = useAppTheme();
  const { shops, getShops, searchedShop, setSearchedShop, isLoading } = useShops();

  return (
    <ScreenView>
      {/* Header */}
      <MainHeader
        withGoBackButton={false}
        title='app.shops'
        className='bg-brand-400'
        textClassName='w-full text-left'
      />

      {/* Search */}
      <View className='w-[95%] self-center flex flex-row items-center relative'>
        <MainInputField
          testID='ShopsScreen:SearchInput'
          placeholder='app.search_shops'
          className='w-full my-6 ps-4 pe-16 border border-neutral-500 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900'
          textInputClassName='ms-4 bg-neutral-100 dark:bg-neutral-900'
          withShadow={false}
          withIcon={true}
          icon='search'
          iconSize={30}
          weight='medium'
          value={searchedShop}
          onChangeText={setSearchedShop}
        />
        {searchedShop?.trim() && (
          <TouchableOpacity
          className='flex absolute end-2 rounded-full p-2 items-center justify-center'
            activeOpacity={0.7}
            onPress={() => setSearchedShop('')}
          >
            <AppIcon
              type='Ionicons'
              name='close'
              color={
                is_dark ? APP_COLORS.neutral[400] : APP_COLORS.neutral[700]
              }
            />
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? <ShopsListSkeleton /> : <ShopsList shops={shops} />}
    </ScreenView>
  );
};

export default ShopsScreens;
