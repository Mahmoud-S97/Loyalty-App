import React, { PropsWithChildren } from 'react';
import { Modal, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import AppText from '@/components/ui/content/AppText';
import MainLoyaltyModal from './MainLoyaltyModal';
import { getTranslated } from '@/lib/localization';

type VoucherRedemptionModalProps = {
  visible: boolean;
  animationType?: 'fade' | 'slide' | 'none';
  loop?: boolean;
  voucherCollected?: number;
  onClose: () => void;
};

const VoucherRedemptionModal = ({
  children,
  visible,
  animationType = 'fade',
  loop = true,
  voucherCollected = 1,
  onClose
}: PropsWithChildren<VoucherRedemptionModalProps>) => {
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
            source={require('@/assets/lottie/award-collection.json')}
            autoPlay
            loop={loop}
            style={{
              width: 200,
              height: 200,
              backgroundColor: 'transparent',
              transform: [{ scale: 1.3 }]
            }}
          />

          {/* Title */}
          <AppText className='mt-6 text-center text-2xl' weight='bold'>
            <Text>{`${getTranslated('app.messages.voucher_redeemed')}  🎉`}</Text>
          </AppText>

          {/* Award message */}
          <AppText
            className='mt-4 mb-6 text-center text-lg text-neutral-800'
            weight='semiBold'
            translationParams={{ voucherCollected: String(voucherCollected) }}
          >
            app.messages.voucher_redeemed_description
          </AppText>

          {/* Close */}
          <MainButton
            title='common.done'
            className='bg-primary min-w-[140px] items-center'
            onPress={onClose}
          />
        </>
      )}
    </MainLoyaltyModal>
  );
};

export default VoucherRedemptionModal;
