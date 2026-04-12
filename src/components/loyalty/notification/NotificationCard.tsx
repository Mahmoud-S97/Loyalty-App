import { JSX, useEffect, useRef } from "react";
import { TouchableOpacity, Image, View, Text, Animated } from "react-native";
import { LOCAL_IMAGES } from "@/constants";
import { cn } from "@/lib/nativeWindCSS/cn";
import MainButton from "@/components/ui/globals/buttons/MainButton";
import { useThemeStyles } from "@/Hooks/theme/useThemeStyles";
import { NotificationItem } from "@/types";

type NotificationCardProps = {
  className?: string,
  item: NotificationItem,
  index: number,
  onPress?: () => void
}

const animatedIds = new Set<number>();

const NotificationCard = ({ item: { id, title, icon, body, createdAt }, index, className, onPress }: NotificationCardProps): JSX.Element => {

  const { cardShadow } = useThemeStyles();

  const fadingAnimation = useRef(new Animated.Value(animatedIds.has(id) ? 1 : 0)).current;
  const translateYAnimation = useRef(new Animated.Value(animatedIds.has(id) ? 0 : 20)).current;

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

  return (
    <Animated.View testID='NotificationCard:AnimatedView' style={[{ opacity: fadingAnimation, transform: [{ translateY: translateYAnimation }] }]} className={cn('w-full min-h-100 px-4 py-6 border-b border-neutral-500 dark:border-neutral-800 bg-neutral-50 dark:bg-secondary', className)}>
      <TouchableOpacity testID='NotificationCard:TouchableOpacity' activeOpacity={0.9} onPress={onPress}>
        <View className="w-full flex flex-row gap-6 items-start justify-start">
          <View className="flex-1/2 items-center justify-center">
            <View className="w-[70px] h-[70px]">
              <Image testID="NotificationCard:Image" source={icon} resizeMode="contain" className="w-full h-full" />
            </View>
          </View>
          <View className="flex-1 flex-col items-start justify-start gap-2">
            <Text className="text-lg font-medium text-neutral-900 dark:text-neutral-400" numberOfLines={2}>{title}</Text>
            <Text className="text-md text-neutral-800 dark:text-neutral-500" numberOfLines={3}>{body}</Text>
            <Text className="text-xs mt-2 text-neutral-700 dark:text-neutral-600" numberOfLines={1}>{createdAt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default NotificationCard;