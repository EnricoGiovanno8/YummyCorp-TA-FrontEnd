import { useTheme } from "@shopify/restyle";
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
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
  variant: "primary" | "default" | "transparent";
  onPress: () => void;
  children?: ReactNode;
}

const Button = ({ label, variant, onPress, children }: ButtonProps) => {
  const theme = useTheme<Theme>();
  const backgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : variant === "transparent"
      ? "transparent"
      : theme.colors.grey;
  const color =
    variant === "primary" ? theme.colors.white : theme.colors.secondary;
  return (
    <TouchableOpacity {...{ onPress }}>
      <RectButton style={{ ...styles.container, backgroundColor }}>
        {children ? (
          children
        ) : (
          <Text variant="button" style={{ color }}>
            {label}
          </Text>
        )}
      </RectButton>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  variant: "default",
};

export default Button;
