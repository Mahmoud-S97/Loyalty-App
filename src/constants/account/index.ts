// Native Camera & Media Library Permission Codes
export const MEDIA_PERMISSION_ERROR_CODES = {
  request_camera: 'request_camera',
  request_library: 'request_library',
  camera_denied: 'camera_denied',
  media_library_denied: 'media_library_denied',
  something_went_wrong: 'something_went_wrong'
} as const;

// Firebase Storage Error Codes
export const STORAGE_ERROR_CODES = {
  object_not_found: 'storage/object-not-found',
  unauthenticated: 'storage/unauthenticated',
  unauthorized: 'storage/unauthorized',
  quota_exceeded: 'storage/quota-exceeded',
  retry_limit_exceeded: 'storage/retry-limit-exceeded',
  canceled: 'storage/canceled',
  // App-level error — this will be used when file-size validation is added.
  file_too_large: 'storage/file-too-large',
  something_went_wrong: 'storage/something_went_wrong'
} as const;

type AccountDetailsRow = {
  label: string;
  mainIcon: string;
  route: string;
};

type AccountDetailsSection = {
  heading: string;
  rows: AccountDetailsRow[];
};

export const ACCOUNT_DETAILS: AccountDetailsSection[] = [
  {
    heading: 'app.all_about_you',
    rows: [
      {
        label: 'app.profile',
        mainIcon: 'person-outline',
        route: '/profile'
      },
      {
        label: 'app.activity',
        mainIcon: 'time-outline',
        route: '/activity'
      }
    ]
  },
  {
    heading: 'app.app_stuff',
    rows: [
      {
        label: 'app.settings',
        mainIcon: 'settings-outline',
        route: '/settings'
      },
      {
        label: 'app.logout',
        mainIcon: 'log-out-outline',
        route: '/logout'
      }
    ]
  }
];

export const ACCOUNT_SETTINGS = [
  {
    label: 'app.account_settings.language',
    iconName: 'globe-outline',
    iconType: 'Ionicons',

    cta: 'language'
  },
  {
    label: 'app.account_settings.dark_mode',
    iconName: 'dark-mode',
    iconType: 'MaterialIcons',

    cta: 'appearance'
  }
] as const;

export const GENDER_ICONS = [
  {
    id: 1,
    gender: 'male',
    iconLabel: 'app.gender.male',
    iconName: 'male'
  },
  {
    id: 2,
    gender: 'female',
    iconLabel: 'app.gender.female',
    iconName: 'female'
  },
  {
    id: 3,
    gender: 'other',
    iconLabel: 'app.gender.other',
    iconName: 'ellipse-outline'
  },
  {
    id: 4,
    gender: 'rather_not_say',
    iconLabel: 'app.gender.rather_not_say',
    iconName: 'close-circle-outline'
  }
] as const;
