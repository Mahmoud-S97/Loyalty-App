import { LoyaltyCardStatus, UserWalletDto } from "@/types";

export interface LoyaltyCard {
  id: string;
  stamps: number;
  status: LoyaltyCardStatus
}

export interface WalletItem {
  id: string;
  shopId: string;
  shopName: string;
  shopDescription: string;
  shopAddress: UserWalletDto['shopAddress'];
  shopLogo: string;
  shopCoverImage: string;
  rewardTitle: string;
  threshold: number;
  loyaltyCards: LoyaltyCard[];
}
