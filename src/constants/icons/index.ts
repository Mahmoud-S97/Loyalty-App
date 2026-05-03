import { ImageSourcePropType } from "react-native";

export const LOCAL_ICONS: Record<string, ImageSourcePropType> = {
  GOOGLE: require("@/assets/icons/social-media/google.png"),
};

export const GENDER_ICONS = [
  {
    id: 1,
    gender: "male",
    iconLabel: "app.gender.male",
    iconName: "male",
  },
  {
    id: 2,
    gender: "female",
    iconLabel: "app.gender.female",
    iconName: "female",
  },
  {
    id: 3,
    gender: "other",
    iconLabel: "app.gender.other",
    iconName: "ellipse-outline",
  },
  {
    id: 4,
    gender: "rather_not_say",
    iconLabel: "app.gender.rather_not_say",
    iconName: "close-circle-outline",
  },
] as const;
