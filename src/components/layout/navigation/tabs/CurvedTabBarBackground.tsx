import { APP_COLORS } from "@/constants/theme";
import { getScreenWidth } from "@/utils";
import { JSX } from "react";
import Svg, { Path } from "react-native-svg";

export const CurvedTabBarBackground = (): JSX.Element => {
  const screen_width = getScreenWidth();
  const barHeight = 60;
  const radius = 36;
  const cornerRadius = 25;
  const buttonRadius = 36;
  const centerX = screen_width / 2;
  const notchDepth = radius;

  return (
    <Svg testID="CurvedTabBarBackground:Svg" width={screen_width} height={barHeight}>
      <Path
        d={`
          M${cornerRadius} 0

          H${centerX - radius}

          C${centerX - radius} 0
           ${centerX - radius} ${notchDepth}
           ${centerX} ${notchDepth}

          C${centerX + radius} ${notchDepth}
           ${centerX + radius} 0
           ${centerX + radius} 0

          H${screen_width - cornerRadius}

          A${cornerRadius} ${cornerRadius} 0 0 1 ${screen_width} ${cornerRadius}

          V${barHeight}
          H0
          V${cornerRadius}

          A${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} 0

          Z
        `}
        fill={APP_COLORS.neutral[400]}
      />
    </Svg>
  );
}