import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import MainLoyaltyModal from './MainLoyaltyModal';
import MainButton from '@/components/ui/globals/buttons/MainButton';
import { getTranslated } from '@/lib/localization';
import { cn } from '@/lib/nativeWindCSS/cn';
import AppIcon from '@/components/ui/globals/icons/AppIcon';
import AppText from '@/components/ui/content/AppText';
import { useAppTheme } from '@/Hooks/theme/useAppTheme';

type RedeemConfirmationModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
};
const RedeemConfirmationModal = ({
  visible,
  onConfirm,
  onClose,
  isLoading = false
}: RedeemConfirmationModalProps) => {
  const { currentThemeColor } = useAppTheme();
  return (
    <MainLoyaltyModal
      visible={visible}
      transparent
      animationType='none'
      onRequestClose={onClose}
    >
      {/* Close button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onClose}
        className='flex items-center justify-center absolute top-5 right-5 z-10'
        disabled={isLoading}
      >
        <AppIcon
          type='MaterialIcons'
          name='close'
          size={30}
          color={currentThemeColor}
        />
      </TouchableOpacity>
      {/* Content */}
      <View className='w-full items-center pt-3'>
        {/* Title */}
        <AppText className='mb-2 mt-6 text-center text-2xl' weight='bold'>
          app.messages.redeem_voucher
        </AppText>
        {/* Redeem message */}
        <AppText className='mb-6 text-center text-lg' weight='semiBold'>
          app.messages.redeem_message
        </AppText>
        {/* Confirm */}
        <MainButton
          className='bg-primary dark:bg-brand-800'
          title='common.confirm'
          onPress={onConfirm}
          isLoading={isLoading}
        />
        {/* Cancel */}
        <MainButton
          className='bg-neutral-700 mt-6'
          title='common.cancel'
          onPress={onClose}
          isLoading={isLoading}
        />
      </View>
    </MainLoyaltyModal>
  );
};
export default RedeemConfirmationModal;
