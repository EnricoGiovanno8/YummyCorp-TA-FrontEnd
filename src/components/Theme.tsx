import {
  ThemeProvider as ReStyleThemeProvider,
  BaseTheme,
  createBox,
  createText,
  createTheme,
  useTheme as useReTheme,
} from "@shopify/restyle";
import React, { ReactNode } from "react";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export const palette = {
  green: "#2CB9B0",
  white: "white",
  orange: "#FE5E33",
  yellow: "#FFc641",
  pink: "#FF87A2",
  violet: "#442CB9",
  lightBlue: "#BFEAF5",
};

const theme: BaseTheme = createTheme({
  colors: {
    primary: palette.green,
    secondary: "#0C0D34",
    danger: "#FF0058",
    text: "rgba(12, 13, 52, 0.7)",
    background: palette.white,
    grey: "#F4F0EF",
    darkGrey: "#808080",
    lightGrey: "#FAFAFA",
    primaryLight: "#E7F9F7",
    greyButton: "rgba(12, 13, 52, 0.05)",
    white: "white",
    graph1: palette.orange,
    graph2: palette.yellow,
    pink: palette.pink,
    violet: palette.violet,
    lightBlue: palette.lightBlue,
  },
  spacing: {
    s: 8,
    sm: 12,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    hero: {
      fontSize: 65,
      lineHeight: 65,
      fontFamily: "SFProDisplay-Bold",
      color: "background",
      textAlign: "center",
    },
    title1: {
      fontSize: 26,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    title2: {
      fontSize: 20,
      lineHeight: 26,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    title3: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    body: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    },
    button: {
      fontSize: 13,
      fontFamily: "SFProDisplay-Medium",
      color: "text",
    },
    header: {
      fontSize: 12,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ReStyleThemeProvider {...{ theme }}>{children}</ReStyleThemeProvider>;
};

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
