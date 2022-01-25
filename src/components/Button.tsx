import { useTheme } from "@shopify/restyle";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Theme } from "./Theme";

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "SFProText-Regular",
    fontSize: 15,
    textAlign: "center",
  },
});

interface ButtonProps {
  label: string;
  variant: "primary" | "default";
  onPress: () => void;
}

const Button = ({ label, variant, onPress }: ButtonProps) => {
  const theme = useTheme<Theme>();
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.button;
  const color = variant === "primary" ? theme.colors.white : theme.colors.title;
  return (
    <TouchableOpacity {...{ onPress }}>
      <RectButton style={{ ...styles.container, backgroundColor }}>
        <Text style={{ ...styles.label, color }}>{label}</Text>
      </RectButton>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  variant: "default",
};

export default Button;
