import React, { memo, useEffect, useRef } from 'react';
import {
  Animated,
  DimensionValue,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import { APP_COLORS } from '@/constants/theme';
import { cn } from '@/lib/nativeWindCSS/cn';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import { RelativePathString, router } from 'expo-router';
import { WalletItem } from './types';

type WalletCardProps = {
  item: WalletItem;
  index: number;
  className?: string;
};

const animatedIds = new Set<string>();

const WalletCard = ({
  item: {
    id,
    shopId,
    shopName,
    shopLogo,
    shopCoverImage,
    shopDescription,
    shopAddress,
    threshold,
    loyaltyCards,
    rewardTitle
  },
  index,
  className
}: WalletCardProps) => {
  const { cardShadow } = useThemeStyles();

  const fadingAnimation = useRef(
    new Animated.Value(animatedIds.has(id) ? 1 : 0)
  ).current;
  const translateYAnimation = useRef(
    new Animated.Value(animatedIds.has(id) ? 0 : 12)
  ).current;

  useEffect(() => {
    if (animatedIds.has(id)) return;

    Animated.parallel([
      Animated.timing(fadingAnimation, {
        toValue: 1,
        duration: 500,
        delay: index * 80,
        useNativeDriver: true
      }),
      Animated.timing(translateYAnimation, {
        toValue: 0,
        duration: 500,
        delay: index * 80,
        useNativeDriver: true
      })
    ]).start();
    animatedIds.add(id);
  }, []);

  const stamps = loyaltyCards.find(card => card.stamps < threshold)?.stamps ?? threshold;

  const rawPercent = (stamps / threshold) * 100;
  const percentage: DimensionValue = `${Math.min(rawPercent, 100)}%`;

  const navigationHandler = (): void => {
    const path = `/vouchers/${id}` as RelativePathString;
    router.push(path);
  };

  return (
    <Animated.View
      testID='WalletCard:AnimatedView'
      style={[
        cardShadow,
        {
          opacity: fadingAnimation,
          transform: [{ translateY: translateYAnimation }]
        }
      ]}
      className={cn(
        'w-full rounded-2xl border border-brand-400 dark:border-brand-500 bg-brand-100 dark:bg-brand-200 mb-10',
        className
      )}
    >
      <TouchableOpacity
        testID='WalletCard:TouchableOpacity'
        activeOpacity={0.8}
        onPress={navigationHandler}
      >
        <Image
          className='w-full h-[150px] rounded-2xl'
          resizeMode='cover'
          source={{ uri: shopCoverImage }}
          alt={shopName}
        />
        <ContainerView className='justify-start items-start p-4'>
          <View className='flex-row justify-between items-center'>
            <View className='flex-column w-[85%]'>
              <AppText
                numberOfLines={1}
                withTranslation={false}
                className='w-full text-left text-neutral-800 dark:text-neutral-800'
                weight='bold'
              >
                {shopName}
              </AppText>
              <AppText
                numberOfLines={1}
                withTranslation={false}
                className='w-full text-left my-1 text-neutral-800 dark:text-neutral-800'
              >
                {shopDescription}
              </AppText>
              <AppText
                numberOfLines={1}
                withTranslation={false}
                className='w-full text-left text-neutral-700 dark:text-neutral-700'
              >
                {shopAddress}
              </AppText>
            </View>
            <View className='w-14 h-14 flex-column justify-center items-center self-start bg-brand-400 rounded-full'>
              <Ionicons
                name='ticket-sharp'
                size={20}
                color={APP_COLORS.brand[900]}
              />
              <AppText className='text-sm text-brand-900 dark:text-brand-900' weight='bold'>
                x1
              </AppText>
            </View>
          </View>
          <View
            className='w-full h-3 border-brand-500 my-4 rounded-full overflow-hidden'
            style={{ borderWidth: 1 }}
          >
            <View
              style={{
                width: percentage,
                height: '100%',
                backgroundColor: APP_COLORS.brand[500],
                borderRadius: 999
              }}
            />
          </View>
          <View className='flex-row justify-between items-center'>
            <AppText
              numberOfLines={1}
              withTranslation={false}
              className='w-[20%] text-neutral-800 dark:text-neutral-800'
              weight='bold'
            >{`${stamps}/${threshold}`}</AppText>
            <AppText
              numberOfLines={1}
              className='w-[75%] text-neutral-800 dark:text-neutral-800'
              weight='semiBold'
            >
              {rewardTitle}
            </AppText>
          </View>
        </ContainerView>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(WalletCard);
