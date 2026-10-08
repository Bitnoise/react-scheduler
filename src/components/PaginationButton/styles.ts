import { mobileMediaQuery } from "@/constants";
import styled, { IStyledComponent } from "styled-components";
import { marginPaddingReset } from "@/styles";
import { PaginationButtonProps, StyledPaginationButton } from "./types";

export const StyledWrapper: IStyledComponent<any, any> = styled.div<
  { $intent: PaginationButtonProps["intent"]; $isVisible: boolean }
>`
  padding: 6px 10px;
  width: 100%;
  border-top: ${({ $intent, theme }) =>
    $intent === "next" ? `1px solid ${theme.colors.border}` : "none"};

  @media ${mobileMediaQuery} {
    ${({ $isVisible }) => (!$isVisible ? "display: none;" : "")}
  }
`;

export const StyledButton: IStyledComponent<any, any> = styled.button<StyledPaginationButton>`
  margin-top: 0px;
  padding: 6px 0;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 150%;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.accent};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

export const StyledIconWrapper: IStyledComponent<any, any> = styled.div`
  position: absolute;
  max-height: 16px;
  margin: 0 4px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledText: IStyledComponent<any, any> = styled.p`
  ${marginPaddingReset}
  margin-left: 14px;
  width: 100%;
  text-align: center;
`;
