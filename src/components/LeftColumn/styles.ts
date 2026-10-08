import styled, { css, IStyledComponent } from "styled-components";
import { headerHeight, leftColumnWidthCss, mobileMediaQuery, navHeight } from "@/constants";
import { StyledInputWrapperProps } from "./types";

const frostedBackground = (color: string, opacity: number) =>
  `color-mix(in srgb, ${color} ${opacity}%, transparent)`;

// opaque on the left, more and more see-through towards the grid
const frostedGradient = (color: string) =>
  `linear-gradient(to right, ${frostedBackground(color, 96)} 55%, ${frostedBackground(color, 65)})`;

// frosted glass, fading from left to right: the background gets more see-through and
// the blur lighter towards the grid. A light blur covers the whole column and a stronger,
// masked one fades out towards the right; both stay inside the column.
const frostedGlass = css`
  background: ${({ theme }) => frostedGradient(theme.colors.background)};

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }
  &::before {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  &::after {
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    mask-image: linear-gradient(to right, #000 50%, transparent);
    -webkit-mask-image: linear-gradient(to right, #000 50%, transparent);
  }
`;

export const StyledWrapper: IStyledComponent<any, any> = styled.div`
  min-width: ${leftColumnWidthCss};
  max-width: ${leftColumnWidthCss};
  min-height: 100vh;
  position: sticky;
  left: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 2;
  ${frostedGlass}
`;

export const StyledLeftColumnHeader: IStyledComponent<any, any> = styled.div`
  padding: 0 12px 10px;
  position: sticky;
  top: 0;
  height: ${navHeight + headerHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: ${leftColumnWidthCss};
  z-index: 3;
  ${frostedGlass}

  @media ${mobileMediaQuery} {
    // center the search button in the area below the topbar
    justify-content: center;
    align-items: center;
    padding: ${navHeight}px 0 0;
  }
`;

export const StyledInput: IStyledComponent<any, any> = styled.input`
  flex: 1 1 0;
  min-width: 0;
  height: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.875rem;
  padding: 0 12px 0 0;
  border: 0;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
  &::-webkit-search-cancel-button {
    cursor: pointer;
  }
`;

export const StyledInputWrapper: IStyledComponent<any, any> = styled.div<StyledInputWrapperProps>`
  height: 38px;
  width: 100%;
  background-color: ${({ theme, $isFocused }) =>
    $isFocused ? theme.colors.background : theme.colors.primary};
  border: 1px solid
    ${({ theme, $isFocused }) => ($isFocused ? theme.colors.accent : theme.colors.border)};
  box-shadow: ${({ theme, $isFocused }) => ($isFocused ? `0 0 0 3px ${theme.colors.secondary}` : "none")};
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: text;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  svg {
    flex-shrink: 0;
    margin-left: 10px;
    height: 18px;
    width: 18px;
  }
  svg path {
    fill: ${({ theme, $isFocused, $hasValue }) =>
      $isFocused || $hasValue ? theme.colors.accent : theme.colors.placeholder};
  }

  @media ${mobileMediaQuery} {
    ${({ $isOpen, $hasValue, theme }) =>
      $isOpen
        ? `
      position: absolute;
      left: 10px;
      top: calc(50% + ${navHeight / 2}px);
      transform: translateY(-50%);
      width: calc(100vw - 20px);
      height: 44px;
      z-index: 10;
      box-shadow: 0px 4px 15px rgba(39, 55, 75, 0.16);
    `
        : `
      width: 44px;
      height: 44px;
      justify-content: center;
      cursor: pointer;
      ${$hasValue ? `border-color: ${theme.colors.accent};` : ""}

      input {
        flex: 0 0 0;
        width: 0;
        padding: 0;
        pointer-events: none;
      }
      svg {
        margin: 0;
      }
    `}
  }
`;
