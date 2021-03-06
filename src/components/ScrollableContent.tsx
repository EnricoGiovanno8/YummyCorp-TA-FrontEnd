import React, { ReactNode } from "react";
import { Dimensions } from "react-native";
import Svg, { ClipPath, Defs, Path, Image } from "react-native-svg";
import { useTheme, Box } from "./Theme";

const { width } = Dimensions.get("window");
const viewBox = {
  width: 375,
  height: 100,
};
const height = (100 * width) / viewBox.width;
const d = "M 0 100 A 50 50 0 0 1 50 50 H 325 A 50 50 0 0 0 375 0 V 100 Z";

interface ContentFooterProps {
  children: ReactNode;
}

const ScrollableContent = ({ children }: ContentFooterProps) => {
  const theme = useTheme();
  return (
    <Box flex={1}>
      {children}
      <Svg
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        width={width}
        height={height}
        viewBox={[0, 0, viewBox.width, viewBox.height].join(" ")}
      >
        <Defs>
          <ClipPath id="clip">
            <Path fill={theme.colors.background} d={d} />
          </ClipPath>
        </Defs>
        <Image
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          href={require("../Home/OutfitIdeas/assets/background.jpg")}
          clipPath="url(#clip)"
        />
      </Svg>
    </Box>
  );
};

export default ScrollableContent;
