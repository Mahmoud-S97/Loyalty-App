import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Modal, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useScreenDimensions } from '@/Hooks/layout/useScreenDimensions';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import AppText from '@/components/ui/content/AppText';
import MainLoyaltyModal from './MainLoyaltyModal';
import { getTranslated } from '@/lib/localization';

type StampCollectedModalProps = {
  visible: boolean;
  animationType?: 'fade' | 'slide' | 'none';
  loop?: boolean;
  stampsCollected?: number;
  stampsLeft: number;
  onClose: () => void;
};

const StampCollectedModal = ({
  children,
  visible,
  animationType = 'fade',
  loop = false,
  stampsCollected = 1,
  stampsLeft,
  onClose
}: PropsWithChildren<StampCollectedModalProps>) => {
  const { SCREEN_WIDTH } = useScreenDimensions();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (visible) {
      animationRef.current?.reset();
      animationRef.current?.play();
    }
  }, [visible]);

  return (
    <MainLoyaltyModal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      {children ? (
        children
      ) : (
        <>
          {/* Celebration animation */}
          <LottieView
            ref={animationRef}
            source={require('@/assets/lottie/stamp-collection.json')}
            loop={loop}
            style={{
              width: 150,
              height: 150
            }}
          />

          {/* Title */}
          <AppText className='mb-2 mt-6 text-center text-2xl' weight='bold'>
            <Text>{`${getTranslated('app.messages.stamp_collected')}  🎉`}</Text>
          </AppText>

          {/* Collected message */}
          <AppText
            className='mb-1 text-center text-lg'
            weight='semiBold'
            translationParams={{ stampsCollected: String(stampsCollected) }}
          >
            app.messages.you_collected_stamp
          </AppText>

          {/* Remaining stamps */}
          <AppText
            className='mb-6 text-center text-sm text-neutral-800 dark:text-neutral-600'
            translationParams={{ stampsLeft: String(stampsLeft) }}
          >
            app.messages.stamps_left_to_get_award
          </AppText>

          {/* Close */}
          <MainButton
            title='common.ok'
            className='bg-primary min-w-[140px] items-center'
            onPress={onClose}
          />
        </>
      )}
    </MainLoyaltyModal>
  );
};

export default StampCollectedModal;
