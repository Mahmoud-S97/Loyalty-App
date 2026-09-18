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

    shopAddress: {
      address1: '24 Dundrum Road',
      address2: 'Dundrum',
      postCode: 'D14 X2P7',
      lat: 53.2908,
      long: -6.2456,
    },

    shopLogo:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167',

    shopCoverImage:
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033',

    rewardTitle: 'Free Stylish Haircut',

    threshold: 10,

    loyaltyCards: [
      {
        id: 'wallet_1_card_1',

        stamps: 10,

        createdAt: '2026-07-01',

        completedAt: '2026-07-20',

        redeemedAt: '2026-07-22',

        status: 'redeemed',
      },

      {
        id: 'wallet_1_card_2',

        stamps: 10,

        createdAt: '2026-08-01',

        completedAt: '2026-08-18',

        redeemedAt: null,

        status: 'completed',
      },

      {
        id: 'wallet_1_card_3',

        stamps: 2,

        createdAt: '2026-08-19',

        completedAt: null,

        redeemedAt: null,

        status: 'active',
      },
    ],
  },

  {
    id: 'wallet_2',

    shopId: 'shop_2',

    shopName: 'Fade Factory - Kingscourt',

    shopDescription: 'Premium Barber Shop - Kingscourt Branch',

    shopAddress: {
      address1: '8 Main Street',
      address2: 'Town Centre',
      postCode: 'A82 K6P4',
      lat: 53.9086,
      long: -6.8058,
    },

    shopLogo:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167',

    shopCoverImage:
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033',

    rewardTitle: 'Free Stylish Haircut',

    threshold: 8,

    loyaltyCards: [
      {
        id: 'wallet_2_card_1',

        stamps: 8,

        createdAt: '2026-07-01',

        completedAt: '2026-07-15',

        redeemedAt: '2026-07-16',

        status: 'redeemed',
      },

      {
        id: 'wallet_2_card_2',

        stamps: 8,

        createdAt: '2026-08-01',

        completedAt: '2026-08-14',

        redeemedAt: null,

        status: 'completed',
      },

      {
        id: 'wallet_2_card_3',

        stamps: 2,

        createdAt: '2026-08-15',

        completedAt: null,

        redeemedAt: null,

        status: 'active',
      },
    ],
  },
];
