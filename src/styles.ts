import { normalize } from "styled-normalize";
import { createGlobalStyle, type DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

type ColorType =
  | "black"
  | "grey"
  | "darkGrey"
  | "superLightBlue"
  | "accentLight"
  | "accent"
  | "hover"
  | "white";

export type Theme = {
  colors: Record<ColorType, string>;
};

export const theme: DefaultTheme = {
  colors: {
    black: "#1C222F",
    grey: "#D2D2D2",
    darkGrey: "#777777",
    superLightBlue: "#F8F8FD",
    accentLight: "#C9E5FF",
    accent: "#0A11EB",
    hover: "#E6F3FF",
    white: "#FFFFFF"
  }
};
