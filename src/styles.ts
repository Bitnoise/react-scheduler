import styled, { createGlobalStyle, type DefaultTheme } from "styled-components";

export const prefixId = "reactSchedulerOutsideWrapper";

export const GlobalStyle = createGlobalStyle`

  #${prefixId} {
    font-family: 'Segoe UI', sans-serif;
    box-sizing: border-box;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    margin: 0;
  }

 #${prefixId} *,
 #${prefixId} *:before,
 #${prefixId} *:after {
    box-sizing: inherit;
    font-family: inherit;
    line-height: inherit;
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
    black: "#323130", //"#1C222F",
    grey600: "#605e5c", // "#a19f9d", //"#777777",
    grey400: "#edebe9", //"#D2D2D2",
    blue900: "#005a9e", // "#3B3C5F",
    blue400: "#0078d4", //"#0A11EB",
    blue300: "#c7e0f4", //"#C9E5FF",
    blue200: "#deecf9", //"#E6F3FF",
    blue100: "#eff6fc", // "#F8F8FD",
    red400: "#d13438", //"#EF4444",
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
