import { APP_COLORS } from "@/constants/theme";
import { getScreenWidth } from "@/utils";
import { JSX } from "react";
import { useColorScheme } from "react-native";
import Svg, { Path } from "react-native-svg";

export const CurvedTabBarBackground = (): JSX.Element => {

  const scheme = useColorScheme();

  const screen_width = getScreenWidth();
  const barHeight = 68;
  const radius = 36;
  const cornerRadius = 25;
  const buttonRadius = 36;
  const centerX = screen_width / 2;
  const notchDepth = radius;

  const strokeWidth = 1.5;
  const halfStroke = strokeWidth / 2;

  const fillColor = scheme === 'dark' ? APP_COLORS.secondary : APP_COLORS.neutral[200];
  const borderColor =
    scheme === "dark"
      ? "rgba(255,255,255,0.08)"
      : "rgba(0,0,0,0.12)";


  return (
    <Svg testID="CurvedTabBarBackground:Svg" width={screen_width} height={barHeight} >
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
        fill={fillColor}
      />
      <Path
        d={`
    M0 ${cornerRadius}

    A${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} 0

    H${centerX - radius}

    C${centerX - radius} 0
     ${centerX - radius} ${notchDepth}
     ${centerX} ${notchDepth}

    C${centerX + radius} ${notchDepth}
     ${centerX + radius} 0
     ${centerX + radius} 0

    H${screen_width - cornerRadius}

    A${cornerRadius} ${cornerRadius} 0 0 1 ${screen_width} ${cornerRadius}
  `}
        fill="none"
        stroke={borderColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

    </Svg>
  );
}