import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const override: ThemeOverride = {
  fonts: {
    body: "'DM Sans', sans-serif",
    heading: "'DM Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },
  colors: {
    red: "#FF00FF",
    yellow: "#FFFF00",
    blue: "#00FFFF",
  },
  fontSizes: {
    subtext: "0.75rem",
    base: "0.93rem",
    h4: "1.172rem",
    h3: "1.172rem",
    h2: "1.465rem",
    h1: "2.289rem",
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  lineHeights: {
    normal: "normal",
    none: "1",
    tight: "1.25",
  },
};

export const theme = extendTheme(override);
