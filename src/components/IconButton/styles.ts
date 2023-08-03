import styled from "styled-components";
import { IconButtonVariant } from "./types";

type ButtonWrapperProps = {
  isFullRounded?: boolean;
  hasChildren?: boolean;
  disabled?: boolean;
  variant: IconButtonVariant;
};

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  outline: none;
  background: ${({ theme, variant }) => (variant === "filled" ? theme.colors.blue400 : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  border: 1px solid
    ${({ theme, disabled }) => (disabled ? theme.colors.grey600 : theme.colors.blue400)};
  border-radius: ${({ isFullRounded }) => (isFullRounded ? "50%" : "4px")};
  cursor: pointer;
  color: ${({ theme, variant }) =>
    variant === "filled" ? theme.colors.white : theme.colors.blue400};
  font-size: 14px;
  gap: 4px;
  padding: ${({ hasChildren }) => (hasChildren ? "0 10px" : "0")};
  transition: 0.5s ease;
`;
