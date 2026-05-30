import { ImageSourcePropType } from "react-native";

export interface VoucherCardProps {
  className?: string;
  logo: ImageSourcePropType | undefined;
  icon: ImageSourcePropType | undefined;
  title: string;
  description?: string;
  threshold: number;
  stamps: number;
}
