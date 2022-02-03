import {
  BaseTheme,
  createBox,
  createText,
  createTheme,
  useTheme as useReTheme,
} from "@shopify/restyle";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

// const palette = {
//   purpleLight: "#8C6FF7",
//   purplePrimary: "#5A31F4",
//   purpleDark: "#3F22AB",

//   greenLight: "#56DCBA",
//   greenPrimary: "#0ECD9D",
//   greenDark: "#0A906E",

//   black: "#0B0B0B",
//   white: "#F0F2F3",
// };

export const theme: BaseTheme = createTheme({
  colors: {
    primary: "#2CB9B0",
    secondary: "#0C0D34",
    danger: "#FF0058",
    text: "rgba(12, 13, 52, 0.7)",
    white: "white",
    grey: "#F4F0EF",
    primaryLight: "#E7F9F7",
    orange: "#FE5E33",
    yellow: "#FFc641",
    pink: "#FF87A2",
    violet: "#442CB9",
    greyButton: "rgba(12, 13, 52, 0.05)",
  },
  spacing: {
    s: 8,
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
      color: "white",
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
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
});

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
