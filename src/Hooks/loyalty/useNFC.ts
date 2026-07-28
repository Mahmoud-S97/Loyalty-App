import { useCallback, useState } from 'react';
import { nfcService } from '@/lib/nfc/nfc.service';
import NfcManager from 'react-native-nfc-manager';
import NFCError, { NFCErrorCode } from '@/lib/nfc/nfc.errors'
import { logger } from '@/lib/logger';

type NFCScanResult =
  | {
      success: true;
      shopId: string;
    }
  | {
      success: false;
      error: NFCError;
    };

export const useNFC = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<NFCError | null>(null);

  const scanForShop = useCallback(async () => {
    try {
      setIsScanning(true);
      setError(null);

      const result = await nfcService.scanForShop();

      return {
        success: true,
        shopId: result.shopId
      };
    } catch (error: any) {
      const nfcError =
        error instanceof NFCError ? error : new NFCError(NFCErrorCode.UNKNOWN);

      logger.log('use-NFC-Hook-Errors: ', nfcError.message);

      setError(nfcError);
      return {
        success: false,
        error: nfcError
      };
    } finally {
      setIsScanning(false);
    }
  }, []);

  return { scanForShop, isScanning, error };
};
