import React, { memo, useEffect, useRef } from 'react';
import {
  Animated,
  DimensionValue,
  Image,
  ImageBackground,
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
import { ShopItem } from './types';
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';

type ShopCardProps = {
  item: ShopItem;
  index: number;
  className?: string;
};

const animatedIds = new Set<string>();

const ShopCard = ({
  item: {
    id,
    name,
    logo,
    coverImage,
    description,
    category,
    specialties,
    address,
    isOpen
  },
  index,
  className
}: ShopCardProps) => {
  const { shadow, cardShadow } = useThemeStyles();
  const { is_dark } = useAppTheme();

  const isPressed = useRef<boolean>(false);

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

  const navigationHandler = (): void => {
    if (isPressed.current) return;

    isPressed.current = true;

    const path = `/shop/${id}` as RelativePathString;
    router.push(path);
    setTimeout(() => (isPressed.current = false), 700);
  };

  return (
    <Animated.View
      testID='ShopCard:AnimatedView'
      style={[
        cardShadow,
        {
          opacity: fadingAnimation,
          transform: [{ translateY: translateYAnimation }]
        }
      ]}
      className={cn(
        'w-full rounded-2xl border border-neutral-400 dark:border-neutral-800 bg-white dark:bg-zinc-800 mb-10',
        className
      )}
    >
      <TouchableOpacity
        testID='ShopCard:TouchableOpacity'
        activeOpacity={0.8}
        onPress={navigationHandler}
      >
        <View className='w-full h-[150px] rounded-2xl overflow-hidden'>
          <ImageBackground
            source={{ uri: coverImage }}
            alt={name}
            resizeMode='cover'
            className='flex-1 relative'
          >
            <Image
              className='size-16 rounded-xl absolute bottom-4 start-4 border border-neutral-800'
              resizeMode='cover'
              source={{ uri: logo }}
              alt={name}
              style={shadow}
            />
          </ImageBackground>
        </View>

        <ContainerView className='justify-start items-start p-4'>
          <View className='flex flex-column w-[85%] gap-1'>
            <AppText
              numberOfLines={1}
              withTranslation={false}
              className='w-full text-lg text-left capitalize text-neutral-800 dark:text-neutral-500'
              weight='bold'
            >
              {name}
            </AppText>
            <AppText
              numberOfLines={1}
              withTranslation={false}
              className='w-full text-md text-left my-1 text-neutral-800 dark:text-neutral-400'
            >
              {specialties?.join(', ')}
            </AppText>
            <View className='flex flex-row items-center gap-1'>
              <AppIcon
                type='Ionicons'
                name='location'
                size={20}
                color={APP_COLORS.neutral[700]}
              />
              <AppText
                numberOfLines={1}
                withTranslation={false}
                className='w-full text-sm text-left text-neutral-700 dark:text-neutral-600'
              >
                {`${address?.address1}, ${address?.address2}`}
              </AppText>
            </View>
            <AppText
              weight='semiBold'
              className={cn(
                'text-sm text-left mt-1',
                isOpen
                  ? 'text-green-600 dark:text-green-600'
                  : 'text-orange-700 dark:text-orange-700'
              )}
            >
              {isOpen ? 'app.open' : 'app.closed'}
            </AppText>
          </View>
        </ContainerView>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(ShopCard);
