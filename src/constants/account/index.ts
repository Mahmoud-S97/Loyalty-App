type AccountDetailsRow = {
  label: string;
  mainIcon: string;
  arrowIcon: string;
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
        arrowIcon: 'chevron-forward',
        route: '/profile'
      },
      {
        label: 'app.activity',
        mainIcon: 'time-outline',
        arrowIcon: 'chevron-forward',
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
        arrowIcon: 'chevron-forward',
        route: '/settings'
      },
      {
        label: 'app.logout',
        mainIcon: 'log-out-outline',
        arrowIcon: 'chevron-forward',
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
    arrowIcon: 'chevron-forward',
    cta: 'language'
  },
  {
    label: 'app.account_settings.dark_mode_on',
    iconName: 'dark-mode',
    iconType: 'MaterialIcons',
    arrowIcon: 'chevron-forward',
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
