import { LOCAL_IMAGES } from '@/constants';
import { UserShopWalletDto } from '@/types';

const barbershoMockImage = require('@/assets/images/app/mock/snipz-barbershop.jpeg');

export const notificationData = [
  {
    id: 1,
    icon: LOCAL_IMAGES.LOGO_TRANS,
    title: 'BESTIE Team',
    body: 'Thank you to joining us!. Try it out and enjoy your free-haircut!',
    createdAt: '2026-04-07, 7:33pm'
  },
  {
    id: 2,
    icon: LOCAL_IMAGES.LOGO_TRANS,
    title: 'BESTIE Team',
    body: "Don't miss out to try scan NFC or QR code in order to get your free-haircut!",
    createdAt: '2026-04-07, 7:33pm'
  },
  {
    id: 3,
    icon: LOCAL_IMAGES.LOGO_TRANS,
    title: 'BESTIE Team',
    body: 'Thank you to joining us!. Try it out and enjoy your free-haircut!',
    createdAt: '2026-04-07, 7:33pm'
  }
];

export const USER_WALLET: UserShopWalletDto[] = [
  {
    id: 'wallet_1',

    shopId: 'shop_1',

    shopName: 'Fade Factory',

    shopDescription: 'Premium Barber Shop',

    shopAddress: 'Dublin 18',

    shopLogo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',

    shopCoverImage:
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033',

    rewardTitle: 'Free Stylish',

    threshold: 10,

    loyaltyCards: [
      {
        id: 'card_1',

        stamps: 10,

        createdAt: '2026-07-01'
      },

      {
        id: 'card_2',

        stamps: 2,

        createdAt: '2026-07-02'
      }
    ]
  },
  {
    id: 'wallet_2',

    shopId: 'shop_2',

    shopName: 'Fade Factory-2',

    shopDescription: 'Premium Barber Shop-2',

    shopAddress: 'Dublin 7',

    shopLogo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',

    shopCoverImage:
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033',

    rewardTitle: 'Free Stylish-2',

    threshold: 8,

    loyaltyCards: [
      {
        id: 'card_2',

        stamps: 8,

        createdAt: '2026-07-01'
      },

      {
        id: 'card_3',

        stamps: 2,

        createdAt: '2026-07-02'
      }
    ]
  }
];
