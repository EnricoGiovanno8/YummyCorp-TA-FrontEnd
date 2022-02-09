import React, { ReactNode } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, useTheme } from "./Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

const { width, height: wHeight } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

export const assets = [
  require("./assets/patterns/1.png"),
  require("./assets/patterns/2.png"),
  require("./assets/patterns/3.png"),
] as const;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
  pattern: 0 | 1 | 2;
}

const Container = ({ children, footer, pattern }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { borderRadii, colors, spacing } = theme;
  const asset = assets[pattern];
  return (
    <KeyboardAwareScrollView>
      <Box
        style={{
          backgroundColor: colors.secondary,
          height:
            wHeight +
            (Platform.OS === "android" ? Constants.statusBarHeight : 0),
        }}
      >
        <StatusBar barStyle="light-content" />
        <Box style={{ backgroundColor: colors.background }}>
          <Box
            style={{
              // @ts-ignore: Object is possibly 'undefined'.
              borderBottomLeftRadius: borderRadii.xl,
              overflow: "hidden",
              height: height * 0.61,
            }}
          >
            <Image
              source={asset}
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
            source={asset}
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
              backgroundColor: colors.background,
              justifyContent: "center"
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
    </KeyboardAwareScrollView>
  );
};

export default Container;
