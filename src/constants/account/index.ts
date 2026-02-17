
type AccountDetailsRow = {
    label: string;
    mainIcon: string;
    arrowIcon: string
}

type AccountDetailsSection = {
    heading: string;
    rows: AccountDetailsRow[]
}


export const ACCOUNT_DETAILS: AccountDetailsSection[] = [
    {
        heading: 'app.all_about_you',
        rows: [
            {
                label: 'app.profile',
                mainIcon: 'person-outline',
                arrowIcon: 'chevron-forward'
            },
            {
                label: 'app.activity',
                mainIcon: 'time-outline',
                arrowIcon: 'chevron-forward'
            }
        ]
    },
    {
        heading: 'app.app_stuff',
        rows: [
            {
                label: 'app.settings',
                mainIcon: 'settings-outline',
                arrowIcon: 'chevron-forward'
            },
            {
                label: 'app.logout',
                mainIcon: 'log-out-outline',
                arrowIcon: 'chevron-forward'
            }
        ]
    }
]