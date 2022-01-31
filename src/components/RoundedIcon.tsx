import React from "react";
import { Theme, Box, Text } from "./Theme";
import { Feather as Icon } from "@expo/vector-icons";

export interface RoundedIconProps {
  name: "mail" | "lock" | "check" | "x";
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
}: RoundedIconProps) => {
  const iconSize = size * 0.5;
  return (
    <Box
      style={{ borderRadius: size / 2 }}
      alignItems="center"
      justifyContent="center"
      height={size}
      width={size}
      {...{ backgroundColor }}
    >
      <Text {...{ color }}>
        <Icon size={iconSize} {...{ name }} />
      </Text>
    </Box>
  );
};

export default RoundedIcon;
