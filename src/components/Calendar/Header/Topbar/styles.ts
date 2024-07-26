import styled from "styled-components";
import { leftColumnWidth } from "@/constants";
import { TopbarProps } from "./types";

const resetBtnStyles = `
  background: none;
  outline: none;
  border: none;
  font-size: 100%;
  line-height: 1.15
  margin: 0
`;

export const Wrapper = styled.div<TopbarProps>`
  width: calc(${({ width }) => width}px - ${leftColumnWidth}px);
  position: sticky;
  top: 0;
  left: ${leftColumnWidth}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => theme.navHeight};
  padding: 0.625rem 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 3;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  gap: 1.875rem;
`;

export const NavBtn = styled.button`
  ${resetBtnStyles};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textPrimary};
  :not(:disabled) {
    cursor: pointer;
  }
`;

export const Today = styled.button`
  ${resetBtnStyles};
  position: relative;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 1.5rem;
    background-color: ${({ theme }) => theme.colors.textPrimary};
  }
  &::before {
    left: -1.125rem;
  }
  &::after {
    right: -1.125rem;
  }
`;

export const Zoom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Filters = styled.div`
  display: flex;
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: "center";
  gap: 1.25rem;
`;
