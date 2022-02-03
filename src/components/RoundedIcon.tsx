import React from "react";
import { Theme, Box, Text } from "./Theme";
import { Feather as Icon } from "@expo/vector-icons";

export interface RoundedIconProps {
  name: any;
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
  iconRatio: number;
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio,
}: RoundedIconProps) => {
  const iconSize = size * iconRatio;
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

RoundedIcon.defaultProps = {
  iconRatio: 0.5,
};

export default RoundedIcon;
