import { JSX, memo, useCallback } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  ImageSourcePropType
} from 'react-native';
import AppText from '@/components/ui/content/AppText';
import { useThemeStyles } from '@/Hooks/theme/useThemeStyles';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';

type VoucherCardProps = {
  id: string;
  stamps: number;
  className?: string;
  image: ImageSourcePropType | undefined;
  title?: string;
  description?: string;
  onRedeem: (id: string) => void;
};

const VoucherCard = ({
  id,
  stamps,
  className,
  image,
  title,
  description,
  onRedeem
}: VoucherCardProps): JSX.Element => {
  const { cardShadow } = useThemeStyles();
  const { SCREEN_WIDTH } = useScreenDimensions();
  const CARD_WIDTH = SCREEN_WIDTH * 0.52;
  const SPACING = 16;

  const onRedeemVoucherPressed = useCallback((): void => {
    onRedeem(id);
  }, [id]);

  return (
    <TouchableOpacity
      testID='VoucherCard:TouchableOpacity'
      style={[cardShadow, { borderWidth: 0.5, width: CARD_WIDTH }]}
      activeOpacity={0.8}
      className='bg-primary border-neutral-500 dark:border-neutral-700 rounded-xl'
      onPress={onRedeemVoucherPressed}
    >
      {image && (
        <ImageBackground
          testID='VoucherCard:ImageBackground'
          source={image}
          className='w-full h-[160px] relative rounded-xl overflow-hidden'
          resizeMode='cover'
        >
          <AppText
            className='text-lg text-left text-neutral-100 dark:text-neutral-400 p-4'
            weight='semiBold'
          >
            {title}
          </AppText>
          <View className='w-full h-12 px-2 py-1 flex flex-row items-center justify-center absolute bottom-0 z-10 bg-brand-500 dark:bg-brand-500'>
            <AppText
              className='text-lg text-neutral-100 dark:text-neutral-400'
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
