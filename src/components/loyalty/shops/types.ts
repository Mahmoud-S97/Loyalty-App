type Address = {
  address1: string;
  address2?: string | null;
};

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  category: string;
  specialties: string[];
  address: Address;
  isOpen: boolean;
};
