import { LOCAL_IMAGES } from "@/constants";

const barbershoMockImage = require('@/assets/images/app/mock/snipz-barbershop.jpeg');

export const walletData = [ // Dummy list
  {
    id: 1,
    name: 'Snipz Barbershop',
    title: 'Snpiz Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    points: 1,
    threshold: 10
  },
  {
    id: 2,
    name: 'Turkish Barbershop',
    title: 'Turkish Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    points: 3,
    threshold: 10
  },
  {
    id: 3,
    name: 'Crafton Barbershop',
    title: 'Crafton Barbershops',
    image: barbershoMockImage,
    address: 'Carrickmacross, Monaghan',
    points: 9,
    threshold: 10
  },
];

export const notificationData = [
  {
    id: 1,
    icon: LOCAL_IMAGES.LOGO_TRANS,
    title: 'BESTIE Team',
    body: "Thank you to joining us!. Try it out and enjoy your free-haircut!",
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