export enum NFCErrorCode {
  NOT_SUPPORTED = 'NFC_NOT_SUPPORTED',
  NOT_ENABLED = 'NFC_NOT_ENABLED',
  CANCELLED = 'NFC_CANCELLED',
  TIMEOUT = 'NFC_TIMEOUT',
  NO_TAG = 'NFC_NO_TAG',
  INVALID_TAG = 'NFC_INVALID_TAG',
  INVALID_SHOP_ID = 'NFC_INVALID_SHOP_ID',
  READ_FAILED = 'NFC_READ_FAILED',
  UNKNOWN = 'NFC_UNKNOWN'
}

class NFCError extends Error {
  constructor(public readonly code: NFCErrorCode) {
    super(code);
    this.name = 'NFCError';
  }
}

export default NFCError;
