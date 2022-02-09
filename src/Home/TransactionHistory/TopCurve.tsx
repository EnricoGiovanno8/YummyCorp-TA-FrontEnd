import React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../components";

interface TopCurveProps {
  footerHeight: number;
}

const TopCurve = ({ footerHeight }: TopCurveProps) => {
  const theme = useTheme();
  // @ts-ignore: Object is possibly 'undefined'.
  const size = theme.borderRadii.xl;
  return (
    <Svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        bottom: footerHeight,
        right: 0,
      }}
      viewBox="0 0 1 1"
    >
      <Path d="M 0 1 A 0 0, 0, 0, 0, 1 0 l 1 1" fill={theme.colors.secondary} />
    </Svg>
  );
};

export default TopCurve;
