import { LOCAL_IMAGES } from '@/constants';
import { Shop, UserVoucher, Voucher } from '@/types';

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


export const shops: Shop[] = [
  {
    id: "shop_1",
    name: "Fade Factory",
    description: "Premium barbershop in Dublin",
    address: "Dublin 18, Ireland",
    coverImage: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    logo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    isActive: true,
  },
  {
    id: "shop_2",
    name: "Urban Cuts",
    description: "Modern grooming experience",
    address: "Dublin City Centre",
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    logo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    isActive: true,
  },
];

export const vouchers: Voucher[] = [
  {
    id: "voucher_1",
    shopId: "shop_1",
    title: "Earn 1 Free Haircut",
    threshold: 10,
    rewardTitle: "Free Haircut",
    isActive: true,
  },
  {
    id: "voucher_2",
    shopId: "shop_1",
    title: "Free Beard Trim",
    threshold: 5,
    rewardTitle: "Beard Trim",
    isActive: true,
  },
];

export const userVouchers: UserVoucher[] = [
  {
    id: "uv_1",
    userId: "user_1",
    shopId: "shop_1",
    shopName: "Fade Factory",
    shopCoverImage:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    shopLogo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    shopDescription: "Premium barbershop in Dublin",
    shopAddress: "Dublin 18, Ireland",
    voucherId: "voucher_1",
    voucherTitle: "Earn 1 Free Haircut",
    threshold: 10,
    stamps: 6,
    isCompleted: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-20",
  },
  {
    id: "uv_2",
    userId: "user_1",
    shopId: "shop_1",
    shopName: "Fade Factory",
    shopCoverImage:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    shopLogo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    shopDescription: "Premium barbershop in Dublin",
    shopAddress: "Dublin 18, Ireland",
    voucherId: "voucher_2",
    voucherTitle: "Free Beard Trim",
    threshold: 5,
    stamps: 5,
    isCompleted: true,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-22",
  },
];