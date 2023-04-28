import { ReactNode } from "react";
import { IconProps } from "../Icon";

export type IconButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  isFullRounded?: boolean;
  isDisabled?: boolean;
} & IconProps;
