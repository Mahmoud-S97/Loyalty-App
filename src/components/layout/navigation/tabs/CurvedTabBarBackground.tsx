import { APP_COLORS } from "@/constants/theme";
import { useScreenDimensions } from "@/Hooks/layout/useScreenDimensions";
import { useAppTheme } from "@/Hooks/theme/useAppTheme";
import { JSX } from "react";
import Svg, { Path } from "react-native-svg";

export const CurvedTabBarBackground = (): JSX.Element => {

  const { SCREEN_WIDTH } = useScreenDimensions();
  const { is_dark } = useAppTheme();

  const barHeight = 68;
  const radius = 36;
  const cornerRadius = 25;
  const buttonRadius = 36;
  const centerX = SCREEN_WIDTH / 2;
  const notchDepth = radius;

  const strokeWidth = 1.5;
  const halfStroke = strokeWidth / 2;

  const fillColor = is_dark ? APP_COLORS.secondary : APP_COLORS.neutral[200];
  const borderColor =
    is_dark
      ? "rgba(255,255,255,0.08)"
      : "rgba(0,0,0,0.12)";


  return (
    <Svg testID="CurvedTabBarBackground:Svg" width={SCREEN_WIDTH} height={barHeight} >
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

          H${SCREEN_WIDTH - cornerRadius}

          A${cornerRadius} ${cornerRadius} 0 0 1 ${SCREEN_WIDTH} ${cornerRadius}

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

    H${SCREEN_WIDTH - cornerRadius}

    A${cornerRadius} ${cornerRadius} 0 0 1 ${SCREEN_WIDTH} ${cornerRadius}
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