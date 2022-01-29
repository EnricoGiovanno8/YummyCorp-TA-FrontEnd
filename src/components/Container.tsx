import React, { ReactNode } from "react";
import { Dimensions, Image, StatusBar, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, useTheme } from "./Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

export const assets = [require("./assets/patterns/1.png")];

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const Container = ({ children, footer }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { borderRadii, colors, spacing } = theme;
  return (
    <Box style={{ backgroundColor: colors.secondary, flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Box style={{ backgroundColor: colors.white }}>
        <Box
          style={{
            // @ts-ignore: Object is possibly 'undefined'.
            borderBottomLeftRadius: borderRadii.xl,
            overflow: "hidden",
            height: height * 0.61,
          }}
        >
          <Image
            source={assets[0]}
            style={{
              width,
              height,
              // @ts-ignore: Object is possibly 'undefined'.
              borderBottomLeftRadius: borderRadii.xl,
            }}
          />
        </Box>
      </Box>
      <Box flex={1} overflow="hidden">
        <Image
          source={assets[0]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            // @ts-ignore: Object is possibly 'undefined'.
            borderBottomLeftRadius: borderRadii.xl,
            top: -height * 0.61,
          }}
        />
        <Box
          style={{
            flex: 1,
            // @ts-ignore: Object is possibly 'undefined'.
            borderRadius: borderRadii.xl,
            borderTopLeftRadius: 0,
            backgroundColor: colors.white,
          }}
        >
          {children}
        </Box>
        <Box
          style={{
            backgroundColor: colors.secondary,
            paddingVertical: spacing.m,
          }}
        >
          {footer}
          <Box height={insets.bottom} />
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
