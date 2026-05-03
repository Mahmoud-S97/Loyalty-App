import { useState, JSX } from "react";
import { View } from "react-native";
import GenderIcon from "./GenderIcon";
import { GENDER_ICONS } from "@/constants";

const GenderList = (): JSX.Element => {
  const [gender, setGender] = useState<string>("male");

  return (
    <View className="w-full px-4 flex flex-row items-center gap-6">
      {GENDER_ICONS.map((icon) => (
        <GenderIcon
          key={icon.id}
          iconLabel={icon.iconLabel}
          iconName={icon.iconName}
          iconWrapperClassName={
            icon.gender === gender
              ? "bg-primary border-primary dark:bg-primary dark:border-primary"
              : "bg-transparent"
          }
          onPress={() => setGender(icon.gender)}
        />
      ))}
    </View>
  );
};

export default GenderList;
