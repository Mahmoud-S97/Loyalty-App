import React, { useEffect, useState } from 'react';
import { appConfigService } from '@/services/firebase/appConfig.service';
import { AppPreferences } from '@/types';
import { logger } from '@/lib/logger';

export const useAppConfig = () => {
  const [appPreferences, setAppPreferences] = useState<AppPreferences | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const preferences = await appConfigService.getAppPreferences();
        if (!preferences) return;

        setAppPreferences(preferences);
      } catch (error: any) {
        logger.log('Get-App-Preferences-Error: ', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, appPreferences };
};
