export interface OpeningHoursDto {
  isOpen: boolean;
  openAt: string | null;
  closeAt: string | null;
}

export interface AddressDto {
  address1: string;
  address2: string | null;
  postCode: string;
  lat: number | null;
  long: number | null;
}

export interface ShopDto {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  rewardTitle: string;
  threshold: number;
  category: string;
  specialties: string[];
  mobileNumber: string;
  address: AddressDto;
  openingHours: {
    monday: OpeningHoursDto;
    tuesday: OpeningHoursDto;
    wednesday: OpeningHoursDto;
    thursday: OpeningHoursDto;
    friday: OpeningHoursDto;
    saturday: OpeningHoursDto;
    sunday: OpeningHoursDto;
  };
  createdAt?: unknown;
  updatedAt?: unknown;
}
