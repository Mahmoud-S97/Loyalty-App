import { ImageSourcePropType } from "react-native";

export interface VoucherCardProps {
  className?: string;
  image?: ImageSourcePropType | undefined;
  title?: string;
  description?: string;
}
