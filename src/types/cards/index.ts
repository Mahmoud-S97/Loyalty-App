export interface Shop {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  address: string;
  isActive: boolean;
}

export interface LoyaltyCard {
  id: string;
  voucherId: string;
  threshold: number;
  stamps: number;
  isCompleted: boolean;
  rewardTitle: string;
}

export interface Voucher {
  id: string;
  shopId: string;
  title: string; // "Earn 1 free haircut"
  description?: string;
  threshold: number; // e.g. 10 stamps
  rewardTitle: string; // "Free Haircut"
  rewardDescription?: string;
  isActive: boolean;
}

// UserVoucher = Wallet-Item
export interface UserVoucher {
  id: string;
  userId: string;
  shopId: string;
  shopName: string;
  shopCoverImage: string;
  shopLogo: string;
  shopDescription: string;
  shopAddress: string;
  voucherId: string;
  voucherTitle: string; // "Earn 1 free haircut"
  threshold: number; // 10
  stamps: number; // current progress
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}