import NfcManager, {
  Ndef,
  NfcTech,
  NdefRecord
} from 'react-native-nfc-manager';
import { NFCShopResult } from './nfc.types';
import NFCError, { NFCErrorCode } from './nfc.errors';
import { logger } from '../logger';

const BESTIE_NFC_PREFIX = 'BESTIE:SHOP:';

class NFCService {
  private readonly SCAN_TIMEOUT = 10_000;

  async isSupported(): Promise<boolean> {
    return await NfcManager.isSupported();
  }

  async isEnabled(): Promise<boolean> {
    return await NfcManager.isEnabled();
  }

  async start(): Promise<void> {
    await NfcManager.start();
  }

  async scanForShop(): Promise<NFCShopResult> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    let didTimeout = false;

    try {
      logger.log('[NFC] 1. Starting scan');
      const supported = await this.isSupported();

      logger.log('[NFC] - Supported?: ', supported);

      if (!supported) {
        throw new NFCError(NFCErrorCode.NOT_SUPPORTED);
      }

      const enabled = await this.isEnabled();

      logger.log('[NFC] - Enabled?: ', enabled);

      if (!enabled) {
        throw new NFCError(NFCErrorCode.NOT_ENABLED);
      }

      await this.start();

      logger.log('[NFC] 2. Before requestTechnology');

      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(async () => {
          didTimeout = true;

          logger.log('[NFC] Timeout reached.');

          reject(new NFCError(NFCErrorCode.TIMEOUT));
        }, this.SCAN_TIMEOUT);
      });

      const requestTechnologyPromise = NfcManager.requestTechnology(
        NfcTech.Ndef
      );

      const safeRequestNfcTechnology = requestTechnologyPromise.catch(
        (error) => {
          logger.log('Native-NFC-Error: ', JSON.stringify(error));
          if (didTimeout) {
            throw new NFCError(NFCErrorCode.TIMEOUT);
          }
          throw error;
        }
      );

      await Promise.race([safeRequestNfcTechnology, timeoutPromise]);

      logger.log('[NFC] 3. requestTechnology resolved');

      const tag = await NfcManager.getTag();

      logger.log('[NFC] 4. getTag resolved:', tag);

      if (!tag) {
        throw new NFCError(NFCErrorCode.NO_TAG);
      }

      const message = tag.ndefMessage;

      logger.log('Message? ', message);

      if (!message || message.length === 0) {
        throw new NFCError(NFCErrorCode.INVALID_TAG);
      }

      const payload: any = message[0].payload;

      logger.log('Payload? ', payload);

      const text = Ndef.text.decodePayload(payload);

      if (!text.startsWith(BESTIE_NFC_PREFIX)) {
        throw new NFCError(NFCErrorCode.INVALID_TAG);
      }

      const shopId = text.replace(BESTIE_NFC_PREFIX, '').trim();

      logger.log('ShopId? ', shopId);

      if (!shopId) {
        throw new NFCError(NFCErrorCode.INVALID_SHOP_ID);
      }

      return {
        shopId
      };
    } catch (error: any) {
      logger.log('[NFC] Caught error:', error);
      if (didTimeout) {
        throw new NFCError(NFCErrorCode.TIMEOUT);
      }
      if (error instanceof NFCError) {
        throw error;
      }

      // Handle User Cancellation
      throw new NFCError(NFCErrorCode.UNKNOWN);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Cleaning up the NFC scanning request
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}

export const nfcService = new NFCService();
