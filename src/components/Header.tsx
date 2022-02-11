import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RoundedIconButton from "./RoundedIconButton";
import { Box, Text } from "./Theme";

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  title: string;
  right?: {
    icon: string;
    onPress: () => void;
  };
  dark: boolean;
  isShoppingCart?: boolean
}

const Header = ({ left, title, right, dark, isShoppingCart }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const color = isShoppingCart ? "background" : dark ? "background" : "secondary";
  const backgroundColor = isShoppingCart ? "primary" : dark ? "secondary" : "background";
  return (
    <Box
      flexDirection="row"
      style={{ marginTop: insets.top }}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
    >
      <RoundedIconButton
        size={44}
        name={left.icon}
        onPress={left.onPress}
        align={backgroundColor === "background" ? "flex-start" : "center"}
        {...{ color, backgroundColor }}
      />
      <Text variant="header" {...{ color }}>
        {title.toUpperCase()}
      </Text>
      {right ? (
        <RoundedIconButton
          size={44}
          name={right.icon}
          onPress={right.onPress}
          align={backgroundColor === "background" ? "flex-end" : "center"}
          {...{ color, backgroundColor }}
        />
      ) : (
        <View style={{ width: 44 }} />
      )}
    </Box>
  );
};

Header.defaultProps = {
  dark: false,
};

export default Header;
