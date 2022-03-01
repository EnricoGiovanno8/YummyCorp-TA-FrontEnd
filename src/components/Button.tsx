import { useTheme } from "@shopify/restyle";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Theme, Text } from "./Theme";

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface ButtonProps {
  label?: string;
  variant: "primary" | "default";
  onPress: () => void;
  style?: TouchableOpacityProps["style"];
  disabled?: TouchableOpacityProps["disabled"]
  opacity?: number
}

const Button = ({ label, variant, onPress, style, disabled, opacity }: ButtonProps) => {
  const theme = useTheme<Theme>();
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.background2;
  const color =
    variant === "primary" ? theme.colors.background : theme.colors.secondary;
  return (
    <TouchableOpacity
      {...{ onPress, disabled }}
      style={[styles.container, style, { backgroundColor, opacity }]}
    >
      <Text variant="button" style={{ color }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  variant: "default",
};

export default Button;
