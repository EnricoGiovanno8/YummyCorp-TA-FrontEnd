import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { mix, mixColor } from "react-native-redash";
import { Box } from "../../components";

const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.8;
const height = width * (425 / 294);
const borderRadius = 24;

interface CardProps {
  position: number;
}

const Card = ({ position }: CardProps) => {
  const backgroundColor = mixColor(position, "#C9E9E7", "#74BCB8");
  const translateY = mix(position, 0, -50);
  const scale = mix(position, 1, 0.9);
  return (
    <Box
      style={StyleSheet.absoluteFill}
      justifyContent="center"
      alignItems="center"
    >
      <Animated.View
        style={{
          backgroundColor,
          width,
          height,
          borderRadius,
          transform: [{ translateY }, { scale }],
        }}
      />
    </Box>
  );
};

export default Card;
