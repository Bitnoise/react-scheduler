import styled from "styled-components";
import { Theme } from "@/styles";
import { IconButtonVariant } from "./types";

type ButtonWrapperProps = {
  isFullRounded?: boolean;
  hasChildren?: boolean;
  disabled?: boolean;
  variant: IconButtonVariant;
};

const variantStyles = (theme: Theme, variant: IconButtonVariant, disabled?: boolean) =>
  ({
    outlined: {
      color: disabled ? theme.colors.disabled : theme.colors.accent,
      border: `1px solid ${disabled ? theme.colors.disabled : theme.colors.accent}`,
      background: "transparent"
    },
    filled: {
      color: disabled ? theme.colors.primary : theme.colors.textSecondary,
      background: disabled ? theme.colors.disabled : theme.colors.accent,
      border: "1px solid transparent"
    }
  }[variant]);

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  border-radius: ${({ isFullRounded }) => (isFullRounded ? "50%" : "4px")};
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  font-size: 14px;
  gap: 4px;
  padding: ${({ hasChildren }) => (hasChildren ? "0 10px" : "0")};
  transition: 0.5s ease;
  ${({ theme, variant, disabled }) => variantStyles(theme, variant, disabled)}
`;
