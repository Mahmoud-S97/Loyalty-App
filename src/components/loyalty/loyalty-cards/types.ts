import { ImageSourcePropType } from 'react-native';
export interface LoyaltyCardProps {
  id: string;
  voucherId: string;
  title: string;
  shopLogo: ImageSourcePropType | string | undefined;
  description?: string;
  threshold: number;
  stamps: number;
  isCompleted: boolean;
  rewardTitle: string;
}
