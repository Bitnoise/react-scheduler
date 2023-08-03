import { ReactNode } from "react";
import { IconProps } from "../Icon";

export type IconButtonVariant = "outlined" | "filled";

export type IconButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  isFullRounded?: boolean;
  isDisabled?: boolean;
  variant?: IconButtonVariant;
} & IconProps;
