import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "@/components/ui/content/AppText";
import { cn } from "@/lib/nativeWindCSS/cn";
import { APP_COLORS } from "@/constants/theme";

type GenderIconProps = {
  gender?: string;
  className?: string;
  iconWrapperClassName?: string;
  iconSize?: number;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconLabel?: string;
  onPress?: () => void;
};

const GenderIcon = ({
  gender,
  className,
  iconWrapperClassName,
  iconName,
  iconSize = 30,
  iconLabel,
  onPress,
}: GenderIconProps) => {
  return (
    <View
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        className={cn(
          "w-16 h-16 flex items-center justify-center rounded-lg border border-neutral-500 dark:border-neutral-200 bg-transparent",
          iconWrapperClassName,
        )}
      >
        <Ionicons
          name={iconName}
          size={iconSize}
          color={APP_COLORS.neutral[500]}
        />
      </TouchableOpacity>
      {iconLabel && <AppText>{iconLabel}</AppText>}
    </View>
  );
};

export default GenderIcon;
