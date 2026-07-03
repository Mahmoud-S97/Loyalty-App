import { JSX, memo } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  ImageSourcePropType
} from 'react-native';
import { Image } from 'expo-image';
import AppText from '@/components/ui/content/AppText';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';
import { LOCAL_IMAGES } from '@/constants';

type LoyaltyCardProps = {
  id: string;
  stamps: number;
  threshold: number;
  className?: string;
  loyaltyIcon: ImageSourcePropType | undefined;
  shopLogo: string | undefined;
  title?: string;
  description?: string;
};

const LoyaltyCard = ({
  id,
  className,
  loyaltyIcon,
  shopLogo,
  title,
  description,
  threshold,
  stamps
}: LoyaltyCardProps): JSX.Element => {
  const { cardShadow } = useThemeStyles();
  const { SCREEN_WIDTH } = useScreenDimensions();
  const CARD_WIDTH = SCREEN_WIDTH * 0.82;
  const SPACING = 16;

  return (
    <View style={{ width: CARD_WIDTH }} className='min-h-30'>
      <AppText
        className='w-full pb-4 text-xs text-neutral-800 dark:text-neutral-600'
        numberOfLines={1}
        translationParams={{ stamps: String(threshold - stamps) }}
      >
        app.collect_more_stamps_to_get_free_haircut
      </AppText>
      <TouchableOpacity
        testID='LoyaltyCard:TouchableOpacity'
        style={[cardShadow, { borderWidth: 2, width: '100%' }]}
        activeOpacity={0.8}
        className='h-[90%] p-6 bg-neutral-50 dark:bg-secondary border-brand-500 dark:border-neutral-800 rounded-xl'
      >
        <View className='flex flex-col gap-6'>
          <View className='flex flex-row items-center gap-4'>
            {shopLogo && (
              <View className='flex items-center justify-center rounded-md overflow-hidden'>
                <Image
                  testID='LoyaltyCard:Logo'
                  source={shopLogo}
                  alt={title}
                  style={{ width: 60, height: 60, borderRadius: 15 }}
                  contentFit='cover'
                  transition={200}
                  cachePolicy='memory-disk'
                  priority='high'
                  placeholder={{ blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010J}I' }}
                />
              </View>
            )}
            <View className='flex-1'>
              <AppText
                className='font-semibold text- text-neutral-800 dark:text-neutral-500'
                weight='semiBold'
                translationParams={{ stamps: String(threshold) }}
              >
                {title}
              </AppText>
            </View>
          </View>
          <View className='flex flex-row items-center justify-center gap-4 flex-wrap'>
            {Array(threshold)
              .fill('')
              .map((item, index) => (
                <View
                  key={index}
                  style={{ borderWidth: 2 }}
                  className='w-12 h-12 flex items-center overflow-hidden justify-center rounded-full bg-brand-200 dark:bg-zinc-700 border-brand-500 dark:border-neutral-800 ring-1 ring-primary'
                >
                  {index < stamps && stamps <= threshold && (
                    <Image
                      testID='LoyaltyCard:StampImage'
                      source={loyaltyIcon}
                      alt={title}
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                      contentFit='cover'
                      transition={200}
                      cachePolicy='memory-disk'
                      priority='high'
                      placeholder={{ blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010J}I' }}
                    />
                  )}
                </View>
              ))}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(LoyaltyCard);
