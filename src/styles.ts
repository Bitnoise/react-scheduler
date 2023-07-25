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
  | "grey400"
  | "grey600"
  | "blue900"
  | "blue100"
  | "blue300"
  | "blue400"
  | "blue200"
  | "red400"
  | "white";

export type Theme = {
  colors: Record<ColorType, string>;
  navHeight: string;
};

export const theme: DefaultTheme = {
  navHeight: "44px",
  colors: {
    black: "#1C222F",
    grey400: "#D2D2D2",
    grey600: "#777777",
    blue900: "#3B3C5F",
    blue100: "#F8F8FD",
    blue300: "#C9E5FF",
    blue400: "#0A11EB",
    blue200: "#E6F3FF",
    red400: "#EF4444",
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
