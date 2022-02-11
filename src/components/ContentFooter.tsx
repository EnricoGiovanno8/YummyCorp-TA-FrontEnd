import React, { ReactNode } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "./Theme";

const { width } = Dimensions.get("window");
const viewBox = {
  width: 375,
  height: 100,
};
const height = (100 * width) / viewBox.width;
const d = "M 0 0 H 375 A 50 50 0 0 1 325 50 H 50 A 50 50 0 0 0 0 100";

interface ContentFooterProps {
  children: ReactNode;
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height: width,
  },
});

const ContentFooter = ({ children }: ContentFooterProps) => {
  const theme = useTheme();
  return (
    <>
      <Image
        source={require("../Home/OutfitIdeas/assets/background.jpg")}
        style={styles.background}
      />
      {children}
      <Svg
        width={width}
        height={height}
        viewBox={[0, 0, viewBox.width, viewBox.height].join(" ")}
      >
        <Path fill={theme.colors.background} d={d} />
      </Svg>
    </>
  );
};

export default ContentFooter;
