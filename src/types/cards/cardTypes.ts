
export type WalletItem = {
  id: number;
  title: string;
  name: string;
  description: string;
  image: any;
  address: string;
  stamps: number;
  threshold: number;
}

export type NotificationItem = {
  id: number;
  icon: any;
  title: string;
  body: string;
  createdAt: string
}