export interface LoyaltyCardDto {
  id: string;
  stamps: number;
  createdAt: string;
}

export interface UserShopWalletDto {
  id: string;
  shopId: string;
  shopName: string;
  shopDescription: string;
  shopAddress: string;
  shopLogo: string;
  shopCoverImage: string;
  rewardTitle: string;
  threshold: number;
  loyaltyCards: LoyaltyCardDto[];
}

export interface RedemptionDto {
  id: string;
  shopId: string;
  shopName: string;
  rewardTitle: string;
  redeemedAt: string;
}
