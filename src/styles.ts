import { normalize } from "styled-normalize";
import styled, { createGlobalStyle, type DefaultTheme } from "styled-components";

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
  | "darkViolet"
  | "superLightBlue"
  | "accentLight"
  | "accent"
  | "hover"
  | "warning"
  | "white";

export type Theme = {
  colors: Record<ColorType, string>;
  navHeight: string;
};

export const theme: DefaultTheme = {
  navHeight: "44px",
  colors: {
    black: "#1C222F",
    grey: "#D2D2D2",
    darkGrey: "#777777",
    darkViolet: "#3B3C5F",
    superLightBlue: "#F8F8FD",
    accentLight: "#C9E5FF",
    accent: "#0A11EB",
    hover: "#E6F3FF",
    warning: "#EF4444",
    white: "#FFFFFF"
  }
};

export const marginPaddingReset = `
margin: 0;
padding: 0;
`;

export const truncate = `
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

export const StyledSchedulerFrame = styled.div`
  margin: 10rem 10rem;
  position: relative;
  width: 40vw;
  height: 40vh;
`;
