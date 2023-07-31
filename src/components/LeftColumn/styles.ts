import styled from "styled-components";
import { leftColumnWidth } from "@/constants";
import { StyledInputWrapperProps } from "./types";

export const StyledWrapper = styled.div`
  min-width: ${leftColumnWidth + "px"};
  max-width: ${leftColumnWidth + "px"};
  padding-top: 94px;
  left: 0;
  position: sticky;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 15px rgba(39, 55, 75, 0.16);
  z-index: 2;
`;

export const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: calc(100% - 44px);
  background-color: transparent;
  padding: 7px 0 7px 12px;
  border: 0;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey600};
  }
`;

export const StyledInputWrapper = styled.div<StyledInputWrapperProps>`
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  height: 36px;
  width: calc(100% - 20px); //20px = 10px margin each side
  background-color: ${({ theme }) => theme.colors.blue100};
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.colors.blue400 : theme.colors.grey400)};
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
