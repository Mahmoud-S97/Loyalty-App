import { RedemptionDto, UserShopWalletDto } from "../cards";

export type Gender = 'male' | 'female' | 'other' | 'rather_not_say';
export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  gender: Gender | string;
  dateOfBirth: string;
  photoURL: string | null;
  userWallet: UserShopWalletDto[] | null;
  voucherRedemtion: RedemptionDto[] | null;
  createdAt?: unknown;
  updatedAt?: unknown;
}
