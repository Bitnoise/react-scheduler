import styled, { IStyledComponent } from "styled-components";
import { leftColumnWidthCss, mobileMediaQuery } from "@/constants";
import { TopbarProps } from "./types";

const resetBtnStyles = `
  margin: 0;
  outline: none;
  border: none;
  background: none;
  font: inherit;
  line-height: 1;
`;

const focusRing = `
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

export const Wrapper: IStyledComponent<any, any> = styled.div<TopbarProps>`
  width: calc(${({ width }) => width}px - ${leftColumnWidthCss});
  position: sticky;
  top: 0;
  left: ${leftColumnWidthCss};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: ${({ theme }) => theme.navHeight};
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 3;

  @media ${mobileMediaQuery} {
    gap: 0.5rem;
    padding: 0 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;
  }
`;

export const HideOnMobile: IStyledComponent<any, any> = styled.span`
  display: contents;

  @media ${mobileMediaQuery} {
    display: none;
  }
`;

export const Filters: IStyledComponent<any, any> = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1 1 0;
`;

export const FilterButton: IStyledComponent<any, any> = styled.button<{ $isActive: boolean }>`
  ${resetBtnStyles};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 36px;
  padding: 0 0.875rem 0 0.75rem;
  border-radius: 999px;
  border: 1px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.accent : theme.colors.border)};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent : theme.colors.background};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textSecondary : theme.colors.textPrimary};
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.accent : theme.colors.primary};
  }
  ${focusRing}

  @media ${mobileMediaQuery} {
    width: 40px;
    height: 40px;
    padding: 0;
    justify-content: center;
  }
`;

export const FilterLabel: IStyledComponent<any, any> = styled.span`
  @media ${mobileMediaQuery} {
    display: none;
  }
`;

export const NavigationWrapper: IStyledComponent<any, any> = styled.div`
  display: flex;
  justify-content: center;
`;

export const Segmented: IStyledComponent<any, any> = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SegmentButton: IStyledComponent<any, any> = styled.button<{ $isActive?: boolean }>`
  ${resetBtnStyles};
  height: 30px;
  padding: 0 0.75rem;
  border-radius: 7px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.background : "transparent"};
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0 1px 3px rgba(16, 24, 40, 0.14), 0 1px 2px rgba(16, 24, 40, 0.08)" : "none"};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.textPrimary : theme.colors.placeholder)};
  font-size: 0.8125rem;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.background};
  }
  ${focusRing}

  @media ${mobileMediaQuery} {
    height: 34px;
  }
`;

export const NavIconButton: IStyledComponent<any, any> = styled.button`
  ${resetBtnStyles};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background};
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.disabled};
    cursor: default;
  }
  ${focusRing}
`;

export const OptionsContainer: IStyledComponent<any, any> = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  flex: 1 1 0;
`;

export const ThemeButton: IStyledComponent<any, any> = styled.button`
  ${resetBtnStyles};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  ${focusRing}

  // the sun and moon svgs have hard-coded colours
  svg [fill]:not([fill="none"]) {
    fill: currentColor;
  }
  svg [stroke] {
    stroke: currentColor;
  }
`;
