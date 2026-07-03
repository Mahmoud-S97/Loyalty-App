export interface LoyaltyCard {
  id: string;
  stamps: number;
  createdAt: string;
}

export interface WalletItem {
  id: string;
  shopId: string;
  shopName: string;
  shopDescription: string;
  shopAddress: string;
  shopLogo: string;
  shopCoverImage: string;
  rewardTitle: string;
  threshold: number;
  loyaltyCards: LoyaltyCard[];
}
