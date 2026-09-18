import { AddressDto } from "../shops";

export type LoyaltyCardStatus =
  | 'active'
  | 'completed'
  | 'redeemed';

export interface LoyaltyCardDto {
  id: string;
  stamps: number;
  createdAt: string;
  completedAt: string | null;
  redeemedAt: string | null;
  status: LoyaltyCardStatus;
}

export interface UserShopWalletDto {
  id: string;
  shopId: string;
  shopName: string;
  shopDescription: string;
  shopAddress: AddressDto;
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
