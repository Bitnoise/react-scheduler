import styled from "styled-components";
import { leftColumnWidth } from "@/constants";

const resetBtnStyles = `
  background: none;
  outline: none;
  border: none;
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${leftColumnWidth + "px"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - ${leftColumnWidth + "px"});
  height: ${({ theme }) => theme.navHeight};
  padding: 0.625rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
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
  cursor: pointer;
`;

export const Today = styled.button`
  ${resetBtnStyles};
  position: relative;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.5rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 1.5rem;
    background-color: ${({ theme }) => theme.colors.darkViolet};
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
`;

export const Filters = styled.div`
  display: flex;
`;
