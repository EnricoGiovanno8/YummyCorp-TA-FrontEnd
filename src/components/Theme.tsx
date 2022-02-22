import {
  ThemeProvider as ReStyleThemeProvider,
  BaseTheme,
  createBox,
  createText,
  createTheme,
  useTheme as useReTheme,
} from "@shopify/restyle";
import React, { ReactNode } from "react";
import { Dimensions, ImageStyle, TextStyle, ViewStyle } from "react-native";

const { width } = Dimensions.get("window");
export const aspectRatio = width / 375;

export const palette = {
  green: "#2CB9B0",
  white: "white",
  orange: "#FE5E33",
  yellow: "#FFc641",
  pink: "#FF87A2",
  violet: "#442CB9",
  lightBlue: "#BFEAF5",
  homeBlue: "#6FA8DC",
  lightPink: "#FFC0CB",
  greenFresh: "#18A558"
};

const theme: BaseTheme = createTheme({
  colors: {
    primary: palette.green,
    primaryLight: "#E7F9F7",
    secondary: "#0C0D34",
    danger: "#FF0058",
    info: "#808080",
    edit: palette.lightBlue,
    text: "rgba(12, 13, 52, 0.7)",
    textContrast: palette.white,
    background: palette.white,
    background2: "#F4F0EF",
    greyButton: "rgba(12, 13, 52, 0.05)",
    lightGrey: "rgba(12, 13, 52, 0.3)",
    lightGrey2: "rgba(12, 13, 52, 0.5)",
    white: palette.white,
    home: palette.homeBlue,
    graph1: palette.orange,
    graph2: palette.yellow,
    drawer1: palette.orange,
    drawer2: palette.yellow,
    drawer3: palette.pink,
    drawer4: palette.violet,
    lightBlue: palette.lightBlue,
    men: palette.homeBlue,
    women: palette.lightPink,
    green: palette.greenFresh
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
    title4: {
      fontSize: 20,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
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
    error: {
      fontSize: 12,
      fontFamily: "SFProDisplay-Semibold",
      color: "danger",
    },
    filter: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Medium",
      color: "text",
    },
    productName: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    },
    productStartsFrom: {
      fontSize: 12,
      fontFamily: "SFProDisplay-Regular",
      color: "lightGrey",
    },
    productPrice: {
      fontSize: 12,
      fontFamily: "SFProDisplay-Regular",
      color: "lightGrey2",
    },
    productPriceTitle: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Regular",
      color: "lightGrey2",
    },
    productPriceTitle2: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    }
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    ll: 40,
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
