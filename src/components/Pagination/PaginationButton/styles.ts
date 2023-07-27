import styled from "styled-components";
import { marginPaddingReset } from "@/styles";
import { StyledPaginationButton } from "./types";

export const StyledWrapper = styled.div<StyledPaginationButton>`
  width: 100%;
  padding: 4px 11px;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
`;

export const StyledButton = styled.button`
  ${marginPaddingReset}
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.blue400};
  border-radius: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue400};
  line-height: 150%;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    transition: 0.5s ease;
    background-color: ${({ theme }) => theme.colors.blue200};
  }
`;

export const StyledIconWrapper = styled.div`
  position: absolute;
  margin: 0 4px 0 10px;
  height: 100%;
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
