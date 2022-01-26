import {
  BaseTheme,
  createBox,
  createText,
  createTheme,
} from "@shopify/restyle";

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

const theme: BaseTheme = createTheme({
  colors: {
    primary: "#2CB9B0",
    title: "#0C0D34",
    text: "rgba(12, 13, 52, 0.7)",
    button: "#0C0D34",
    white: "white",
    grey: "rgba(12, 13, 52, 0.05)",
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
      color: "title",
    },
    title2: {
      fontSize: 20,
      lineHeight: 26,
      fontFamily: "SFProDisplay-Semibold",
      color: "title",
    },
    body: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    },
    button: {
      fontSize: 13,
      fontFamily: "SFProDisplay-Regular",
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
export default theme;
