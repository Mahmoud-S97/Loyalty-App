import React, { memo, useEffect, useRef } from 'react';
import { Animated, DimensionValue, Image, TouchableOpacity, useColorScheme, View } from 'react-native';
import ContainerView from '@/components/layout/screens/ContainerView';
import AppText from '@/components/ui/content/AppText';
import { APP_COLORS, cardShadowStyle } from '@/constants/theme';
import { cn } from '@/lib/nativeWindCSS/cn';
import { Ionicons } from '@expo/vector-icons';
import { WalletItem } from '@/types';

type WalletCardProps = {
    item: WalletItem,
    index: number,
    className?: string,
    onPress?: () => void
}

const animatedIds = new Set<number>();

const WalletCard = ({ item: { id, title, name, image, address, points = 0, threshold = 10 }, index, className, onPress }: WalletCardProps) => {

    const scheme = useColorScheme();

    const fadingAnimation = useRef(new Animated.Value(animatedIds.has(id) ? 1 : 0)).current;
    const translateYAnimation = useRef(new Animated.Value(animatedIds.has(id) ? 0 : 12)).current;

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


    const rawPercent = (points / threshold) * 100;
    const percentage: DimensionValue = `${Math.min(rawPercent, 100)}%`;


    return (
        <Animated.View style={[cardShadowStyle(scheme), { opacity: fadingAnimation, transform: [{ translateY: translateYAnimation }] }]} className={cn('w-full rounded-2xl bg-brand-100 dark:bg-brand-200 mb-10', className)}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                <Image className='w-full h-[150px] rounded-2xl' resizeMode='cover' source={image} alt={title} />
                <ContainerView className='justify-start items-start p-4'>
                    <View className='flex-row justify-between items-center'>
                        <View className='flex-column w-[85%]'>
                            <AppText numberOfLines={1} withTranslation={false} className='w-full font-trans font-bold text-neutral-800 dark:text-neutral-800'>{name}</AppText>
                            <AppText numberOfLines={1} withTranslation={false} className='w-full my-1 text-neutral-800 dark:text-neutral-800'>{title}</AppText>
                            <AppText numberOfLines={1} withTranslation={false} className='w-full text-neutral-600 dark:text-neutral-700'>{address}</AppText>
                        </View>
                        <View className='w-14 h-14 flex-column justify-center items-center self-start bg-brand-400 rounded-full'>
                            <Ionicons name='ticket-sharp' size={20} color={APP_COLORS.brand[900]} />
                            <AppText className='text-sm font-trans font-bold text-brand-900 dark:text-brand-900'>x1</AppText>
                        </View>
                    </View>
                    <View className='w-full h-3 border-brand-500 my-4 rounded-full overflow-hidden' style={{ borderWidth: 1 }}>
                        <View style={{ width: percentage, height: '100%' as const, backgroundColor: APP_COLORS.brand[500], borderRadius: 999 }} />
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <AppText numberOfLines={1} withTranslation={false} className='w-[20%] text-neutral-800 dark:text-neutral-800 font-trans font-bold'>{`${points}/${threshold}`}</AppText>
                        <AppText numberOfLines={1} className='w-[75%] text-neutral-800 dark:text-neutral-800 font-trans font-semiBold'>app.earn_one_free_haircut</AppText>
                    </View>
                </ContainerView>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default memo(WalletCard);