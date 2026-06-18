import { ImageSourcePropType } from "react-native";

export interface VoucherCardProps {
  className?: string;
  logo: ImageSourcePropType | string |  undefined;
  icon: ImageSourcePropType | string |  undefined;
  title: string;
  description?: string;
  threshold: number;
  stamps: number;
}
