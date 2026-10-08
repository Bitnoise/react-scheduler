import styled, { createGlobalStyle, type DefaultTheme, IStyledComponent } from "styled-components";
import { NamedExoticComponent } from "react";

export const prefixId = "reactSchedulerOutsideWrapper";

export const GlobalStyle: NamedExoticComponent = createGlobalStyle`

  #${prefixId} {
    font-family: 'Inter', sans-serif;
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

export type ColorType =
  | "background"
  | "gridBackground"
  | "primary"
  | "secondary"
  | "tertiary"
  | "textPrimary"
  | "textSecondary"
  | "accent"
  | "disabled"
  | "border"
  | "placeholder"
  | "warning"
  | "button"
  | "tooltip"
  | "defaultTile"
  | "hover";

export type Theme = {
  colors: Record<ColorType, string>;
  navHeight: string;
  mode: "light" | "dark";
};

export const theme: DefaultTheme = {
  mode: "light",
  navHeight: "56px",
  colors: {
    background: "#FFFFFF",
    gridBackground: "#FFFFFF",

    primary: "#F8F8FD",
    secondary: "#E6F3FF",
    tertiary: "#C9E5FF",

    textPrimary: "#1C222F",
    textSecondary: "#FFFFFF",
    placeholder: "#777777",

    button: "#FFFFFF",
    border: "#E4E7EC",
    tooltip: "#1F2733",
    hover: "#E6F3FF",
    disabled: "#777777",
    warning: "#EF4444",

    defaultTile: "#728DE2",

    accent: "#0A11EB"
  }
};

export const darkTheme: Theme = {
  mode: "dark",
  navHeight: "56px",
  colors: {
    background: "#161B22",
    gridBackground: "#1E252E",

    primary: "#303b49",
    secondary: "#444e5b",
    tertiary: "#6E757F",

    textPrimary: "#DADCE0",
    textSecondary: "#EAEBED",
    placeholder: "#bbbbbb",

    button: "#60676f",
    border: "#2C333A",
    hover: "#303439",
    tooltip: "#39424F",
    disabled: "#38414a",
    warning: "#FF4C4C",

    defaultTile: "#728DE2",

    accent: "#1798c2"
  }
};

// canvas can't use color-mix(), so tints are computed from hex colours
export const withAlpha = (hex: string, alpha: number): string => {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value.slice(0, 6);
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return hex;
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
};

export const getCanvasColors = (
  theme: Theme
): { today: string; weekend: string; todayBorder: string } => ({
  today: withAlpha(theme.colors.accent, theme.mode === "dark" ? 0.2 : 0.11),
  todayBorder: withAlpha(theme.colors.accent, 0.35),
  weekend: theme.mode === "dark" ? "rgba(255, 255, 255, 0.06)" : "#EEF0F4"
});

export const marginPaddingReset = `
margin: 0;
padding: 0;
`;

export const truncate = `
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

export const StyledSchedulerFrame: IStyledComponent<any, any> = styled.div`
  margin: 10rem 10rem;
  position: relative;
  width: 40vw;
  height: 40vh;
`;
