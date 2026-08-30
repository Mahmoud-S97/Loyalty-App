import { useState, JSX, use, useEffect } from "react";
import { View } from "react-native";
import GenderIcon from "./GenderIcon";
import { GENDER_ICONS } from "@/constants";
import { Gender } from "@/types/user";

type GenderListProps = {
  testID?: string;
  currentGender?: Gender | string,
  onSelectGender: (gender: Gender) => void
}

const GenderList = ({ testID, onSelectGender, currentGender }: GenderListProps): JSX.Element => {
  const [gender, setGender] = useState<Gender | string>('');

  useEffect(() => {
    if(currentGender) {
      setGender(currentGender)
    }
  }, [currentGender]);

  return (
    <View testID={testID || 'GenderList:Container'} className="w-full px-4 flex flex-row items-center gap-6">
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
          onPress={() => {
            setGender(icon.gender)
            onSelectGender(icon.gender)
          }}
        />
      ))}
    </View>
  );
};

export default GenderList;
