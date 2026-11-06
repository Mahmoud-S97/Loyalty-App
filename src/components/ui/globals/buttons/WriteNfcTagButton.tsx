import { View } from 'react-native';
import MainButton from './MainButton';

type WriteNfcTagButtonProps = {
  onPress: () => void;
  isLoading: boolean;
};

export default function WriteNfcTagButton({
  onPress,
  isLoading
}: WriteNfcTagButtonProps) {
  return (
    <View className='absolute bottom-0 left-0 right-0 z-50 bg-white px-4 pb-6 pt-4 dark:bg-neutral-950'>
      <MainButton
        title='app.nfc.write.button'
        onPress={onPress}
        isLoading={isLoading}
        disabled={isLoading}
        className='bg-primary dark:bg-primary/70'
        textClassName='text-white dark:text-white'
      />
    </View>
  );
}
