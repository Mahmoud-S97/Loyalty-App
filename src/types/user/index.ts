import { Voucher } from "../cards";

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  birthdate: Date | string;
  gender: string;
  createdAt: string;
  vouchers: Voucher[]
}