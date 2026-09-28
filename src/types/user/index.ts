import { RedemptionDto, UserWalletDto } from "../wallet";

export type Gender = 'male' | 'female' | 'other' | 'rather_not_say';
export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  gender: Gender | string;
  dateOfBirth: string;
  photoURL: string | null;
  userWallet: UserWalletDto[] | null;
  voucherRedemtion: RedemptionDto[] | null;
  createdAt?: unknown;
  updatedAt?: unknown;
}
