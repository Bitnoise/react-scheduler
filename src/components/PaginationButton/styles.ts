import styled from "styled-components";
import { marginPaddingReset } from "@/styles";
import { PaginationButtonProps, StyledPaginationButton } from "./types";

export const StyledWrapper = styled.div<Pick<PaginationButtonProps, "intent">>`
  padding: 4px 11px 0;
  width: 100%;
  border-top: ${({ intent, theme }) =>
    intent === "next" ? `1px solid ${theme.colors.border}` : "none"};
`;

export const StyledButton = styled.button<StyledPaginationButton>`
  margin-top: 0px;
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 150%;
  letter-spacing: 1px;
  cursor: pointer;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
  &:hover {
    transition: 0.5s ease;
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

export const StyledIconWrapper = styled.div`
  position: absolute;
  max-height: 16px;
  margin: 0 4px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledText = styled.p`
  ${marginPaddingReset}
  margin-left: 14px;
  width: 100%;
  text-align: center;
`;
