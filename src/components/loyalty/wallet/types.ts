import { UserShopWalletDto } from "@/types";

export interface LoyaltyCard {
  id: string;
  stamps: number;
}

export interface WalletItem {
  id: string;
  shopId: string;
  shopName: string;
  shopDescription: string;
  shopAddress: UserShopWalletDto['shopAddress'];
  shopLogo: string;
  shopCoverImage: string;
  rewardTitle: string;
  threshold: number;
  loyaltyCards: LoyaltyCard[];
}
