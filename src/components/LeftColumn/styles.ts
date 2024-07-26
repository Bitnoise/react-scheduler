import styled from "styled-components";
import { leftColumnWidth } from "@/constants";
import { StyledInputWrapperProps } from "./types";

export const StyledWrapper = styled.div`
  min-width: ${leftColumnWidth + "px"};
  max-width: ${leftColumnWidth + "px"};
  min-height: 100vh;
  position: sticky;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 4px 15px rgba(39, 55, 75, 0.16);
  z-index: 2;
`;

export const StyledLeftColumnHeader = styled.div`
  padding-bottom: 4px;
  position: sticky;
  top: 0;
  height: 124px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: ${leftColumnWidth}px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 3;
`;

export const StyledInput = styled.input`
  height: 100%;
  width: calc(100% - 44px);
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 7px 0 7px 12px;
  border: 0;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

export const StyledInputWrapper = styled.div<StyledInputWrapperProps>`
  margin-left: 10px;
  height: 36px;
  width: calc(100% - 20px); //20px = 10px margin each side
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.colors.accent : theme.colors.border)};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    margin-left: auto;
    margin-right: 12px;
    height: 24px;
    width: 24px;
  }
`;
