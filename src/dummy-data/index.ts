import { LOCAL_IMAGES } from '@/constants';
import { WalletItem } from '@/types';

const barbershoMockImage = require('@/assets/images/app/mock/snipz-barbershop.jpeg');

export const walletData: WalletItem[] = [
  // Dummy list
  {
    id: 1,
    name: 'Snipz Barbershop',
    title: 'Snpiz Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    stamps: 1,
    threshold: 10
  },
  {
    id: 2,
    name: 'Turkish Barbershop',
    title: 'Turkish Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    stamps: 3,
    threshold: 10
  },
  {
    id: 3,
    name: 'Crafton Barbershop',
    title: 'Crafton Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    stamps: 9,
    threshold: 10
  }
];

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

export const vouchersList = [
  {
    id: 1,
    image: LOCAL_IMAGES.REDEEMING_VOUCHER,
    title: 'app.reward_one_free_haircut',
    description: 'app.redeem_now'
  },
  {
    id: 2,
    image: LOCAL_IMAGES.REDEEMING_VOUCHER,
    title: 'app.reward_one_free_haircut',
    description: 'app.redeem_now'
  },
  {
    id: 3,
    image: LOCAL_IMAGES.REDEEMING_VOUCHER,
    title: 'app.reward_one_free_haircut',
    description: 'app.redeem_now'
  }
];

export const loyaltyCardsData = [
  {
    id: 1,
    logo: barbershoMockImage,
    icon: LOCAL_IMAGES.LOGO_TRANS,
    title: 'app.collect_stamps_and_get_free_haircut',
    description: 'app.redeem_now',
    userId: 21,
    threshold: 10,
    stamps: 4
  },
  {
    id: 2,
    logo: barbershoMockImage,
    icon: LOCAL_IMAGES.LOGO_TRANS,
    title: 'app.collect_stamps_and_get_free_haircut',
    description: 'app.redeem_now',
    userId: 21,
    threshold: 5,
    stamps: 2
  },
  {
    id: 3,
    logo: barbershoMockImage,
    icon: LOCAL_IMAGES.LOGO_TRANS,
    title: 'app.collect_stamps_and_get_free_haircut',
    description: 'app.redeem_now',
    userId: 22,
    threshold: 8,
    stamps: 4
  }
];
