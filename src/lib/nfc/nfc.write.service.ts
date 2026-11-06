import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import NFCError, { NFCErrorCode } from './nfc.errors';
import { logger } from '../logger';
import { NFCShopResult } from './nfc.types';

const BESTIE_NFC_PREFIX = 'BESTIE:SHOP:';

class NFCWriteService {
  private readonly SCAN_TIMEOUT = 20_000;

  async writeShopId(shopId: string): Promise<NFCShopResult> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let didTimeout = false;

    const normalizedShopId = shopId.trim();

    if (
      !normalizedShopId ||
      normalizedShopId.includes(':') ||
      normalizedShopId !== shopId
    ) {
      throw new NFCError(NFCErrorCode.INVALID_SHOP_ID);
    }

    const payload = `${BESTIE_NFC_PREFIX}${normalizedShopId}`;

    try {
      // 1. Check device NFC support.
      const supported = await NfcManager.isSupported();

      if (!supported) {
        throw new NFCError(NFCErrorCode.NOT_SUPPORTED);
      }

      // 2. Check whether NFC is enabled.
      const enabled = await NfcManager.isEnabled();

      if (!enabled) {
        throw new NFCError(NFCErrorCode.NOT_ENABLED);
      }

      // 3. Initialize NFC.
      await NfcManager.start();

      // 4. Wait for a compatible NFC tag, with a timeout.
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          didTimeout = true;

          logger.log('[NFC Write] Tag detection timed out.');

          reject(new NFCError(NFCErrorCode.TIMEOUT));

          // Cancel the native NFC request without blocking rejection.
          void NfcManager.cancelTechnologyRequest().catch(() => {});
        }, this.SCAN_TIMEOUT);
      });

      const requestPromise = NfcManager.requestTechnology(NfcTech.Ndef).catch(
        (error) => {
          if (didTimeout) {
            throw new NFCError(NFCErrorCode.TIMEOUT);
          }

          throw error;
        }
      );

      await Promise.race([requestPromise, timeoutPromise]);

      // 5. Inspect the detected tag.
      const tag = await NfcManager.getTag();

      if (!tag) {
        throw new NFCError(NFCErrorCode.INVALID_TAG);
      }

      // 6. Encode the BESTIE shop ID as an NDEF text record.
      const bytes = Ndef.encodeMessage([Ndef.textRecord(payload)]);

      if (!bytes || bytes.length === 0) {
        throw new NFCError(NFCErrorCode.WRITE_FAILED);
      }

      // 7. Write the NDEF message to the tag.
      await NfcManager.ndefHandler.writeNdefMessage(bytes);

      logger.log('[NFC Write] Shop tag written successfully.');

      return {
        shopId
      };
    } catch (error) {
      if (didTimeout) {
        throw new NFCError(NFCErrorCode.TIMEOUT);
      }

      if (error instanceof NFCError) {
        throw error;
      }

      logger.error('[NFC Write] Failed to write shop tag:', error);

      throw new NFCError(NFCErrorCode.WRITE_FAILED);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // 8. Always release the NFC technology request.
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch {
        // Ignore errors if the request was already cancelled.
      }
    }
  }
}

export const nfcWriteService = new NFCWriteService();
