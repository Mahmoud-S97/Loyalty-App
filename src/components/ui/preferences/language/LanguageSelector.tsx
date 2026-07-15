import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '@/components/ui/content/AppText';
import { APP_COLORS } from '@/constants/theme';
import { cn } from '@/lib/nativeWindCSS/cn';

export type AppLanguage = 'en' | 'ar';

interface LanguageSelectorProps {
  selectedLanguage: AppLanguage;
  switchLanguageHandler: (lang: AppLanguage) => void;
}

const LANGUAGES = [
  {
    code: 'en' as const,
    title: 'preferences.lang.english'
  },
  {
    code: 'ar' as const,
    title: 'preferences.lang.arabic'
  }
];

const LanguageSelector = ({
  selectedLanguage,
  switchLanguageHandler
}: LanguageSelectorProps) => {
  return (
    <View className='gap-3 py-2'>
      {LANGUAGES.map(({ code, title }) => {
        const selected = selectedLanguage === code;

        return (
          <Pressable
            key={code}
            onPress={() => switchLanguageHandler(code)}
            android_ripple={{ color: APP_COLORS.neutral[500] }}
            className='flex-row items-center justify-between rounded-2xl bg-neutral-100 dark:bg-secondary px-5 py-4'
          >
            <AppText className='text-base font-medium text-neutral-900 dark:text-neutral-100'>
              {title}
            </AppText>

            <View
              className={cn(
                'h-6 w-6 items-center justify-center rounded-full border-2',
                selected
                  ? 'border-brand-500'
                  : 'border-neutral-400 dark:border-neutral-600'
              )}
            >
              {selected && (
                <View className='h-3 w-3 rounded-full bg-brand-500' />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default memo(LanguageSelector);
