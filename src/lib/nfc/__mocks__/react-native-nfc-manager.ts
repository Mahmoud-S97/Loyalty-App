const NfcManager = {
  start: jest.fn(),

  isSupported: jest.fn(() => Promise.resolve(true)),

  isEnabled: jest.fn(() => Promise.resolve(true)),

  requestTechnology: jest.fn(() => Promise.resolve()),

  cancelTechnologyRequest: jest.fn(() => Promise.resolve()),

  getTag: jest.fn(() => Promise.resolve(null)),

  goToNfcSetting: jest.fn()
};

export const NfcTech = {
  Ndef: 'Ndef'
};

export const Ndef = {
  text: {
    decodePayload: jest.fn(() => 'BESTIE:SHOP:test-shop')
  }
};

export default NfcManager;
