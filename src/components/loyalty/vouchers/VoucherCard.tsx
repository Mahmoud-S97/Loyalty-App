import { JSX, memo } from 'react';
import { TouchableOpacity, ImageBackground, View } from 'react-native';
import AppText from '@/components/ui/content/AppText';
import { VoucherCardProps } from './types';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';

const VoucherCard = ({
  className,
  image,
  title,
  description
}: VoucherCardProps): JSX.Element => {
  const { cardShadow } = useThemeStyles();
  const { SCREEN_WIDTH } = useScreenDimensions();
  const CARD_WIDTH = SCREEN_WIDTH * 0.52;
  const SPACING = 16;

  return (
    <TouchableOpacity
      style={[cardShadow, { borderWidth: 0.5, width: CARD_WIDTH }]}
      activeOpacity={0.8}
      className='bg-primary border-neutral-500 dark:border-neutral-700 rounded-lg overflow-hidden'
    >
      {image && (
        <ImageBackground
          source={image}
          className='w-full h-[120px] relative rounded-lg overflow-hidden'
          resizeMode='cover'
        >
          <View className='w-full h-10 px-2 py-1 flex flex-row items-center justify-center absolute bottom-0 z-10 bg-brand-500 dark:bg-brand-500'>
            <AppText
              className='text-sm text-neutral-100 dark:text-neutral-400 font-semibold'
              weight='semiBold'
            >
              {description}
            </AppText>
          </View>
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
};

export default memo(VoucherCard);
