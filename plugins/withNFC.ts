import {
  ConfigPlugin,
  withAndroidManifest,
  withEntitlementsPlist,
  withInfoPlist,
} from 'expo/config-plugins';

const withNFC: ConfigPlugin = (config) => {
  // Android
  config = withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;

    // NFC permission
    const permissions = manifest['uses-permission'] ?? [];

    if (
      !permissions.some(
        (permission) =>
          permission.$?.['android:name'] === 'android.permission.NFC'
      )
    ) {
      permissions.push({
        $: {
          'android:name': 'android.permission.NFC',
        },
      });
    }

    manifest['uses-permission'] = permissions;

    // NFC hardware is optional
    const features = manifest['uses-feature'] ?? [];

    if (
      !features.some(
        (feature) =>
          feature.$?.['android:name'] === 'android.hardware.nfc'
      )
    ) {
      features.push({
        $: {
          'android:name': 'android.hardware.nfc',
          'android:required': 'false',
        },
      });
    }

    manifest['uses-feature'] = features;

    return config;
  });

  // iOS permission message
  config = withInfoPlist(config, (config) => {
    config.modResults.NFCReaderUsageDescription =
      'BESTIE uses NFC to connect you with your barber shop.';

    return config;
  });

  // iOS NFC entitlement
  config = withEntitlementsPlist(config, (config) => {
    config.modResults['com.apple.developer.nfc.readersession.formats'] = [
      'NDEF',
    ];

    return config;
  });

  return config;
};

export default withNFC;