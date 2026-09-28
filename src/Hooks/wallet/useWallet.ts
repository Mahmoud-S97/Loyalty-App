import { useCallback, useEffect, useState } from 'react';

import { logger } from '@/lib/logger';
import { userWalletService } from '@/services/firebase/userWallet.service';
import { UserWalletDto } from '@/types';
import { handleUserWalletErrorMessage } from '@/utils/userWallet';

interface UseWalletResult {
  wallet: UserWalletDto[];
  isLoading: boolean;
  refreshWallet: () => Promise<void>;
  getWalletByShopId: (shopId: string) => Promise<UserWalletDto | null>;
  createOrUpdateUserWallet: (
    shopId: string,
    data: Omit<UserWalletDto, 'id'>
  ) => Promise<string | null>;
}

export const useWallet = (userId?: string): UseWalletResult => {
  const [wallet, setWallet] = useState<UserWalletDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshWallet = useCallback(async (): Promise<void> => {
    if (!userId?.trim()) {
      setWallet([]);
      return;
    }

    try {
      setIsLoading(true);

      const userWallet = await userWalletService.getUserWallet(userId);

      setWallet(userWallet);
    } catch (error: any) {
      logger.error('Get-User-Wallets-Failed:', error);

      const errorCode = error?.code;
      handleUserWalletErrorMessage(errorCode);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const getWalletByShopId = useCallback(
    async (shopId: string): Promise<UserWalletDto | null> => {
      if (!userId?.trim() || !shopId?.trim()) {
        return null;
      }

      try {
        return await userWalletService.getUserWalletById(userId, shopId);
      } catch (error: any) {
        logger.error('Get-Wallet-By-Shop-ID-Failed:', error);
        const errorCode = error?.code;
        handleUserWalletErrorMessage(errorCode);
        return null;
      }
    },
    [userId]
  );

  const createOrUpdateUserWallet = useCallback(
    async (
      shopId: string,
      data: Omit<UserWalletDto, 'id'>
    ): Promise<string | null> => {
      if (!userId?.trim() || !shopId?.trim()) {
        return null;
      }

      try {
        setIsLoading(true);
        const walletId = await userWalletService.createOrUpdateUserWallet(
          userId,
          shopId,
          data
        );

        await refreshWallet();

        return walletId;
      } catch (error: any) {
        logger.error('Create-Or-Update-User-Wallet-Failed:', error);
        const errorCode = error?.code;
        handleUserWalletErrorMessage(errorCode);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [userId, refreshWallet]
  );

  useEffect(() => {
    refreshWallet();
  }, [refreshWallet]);

  return {
    wallet,
    isLoading,
    refreshWallet,
    getWalletByShopId,
    createOrUpdateUserWallet
  };
};
