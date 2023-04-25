import { ReactNode } from "react";
import { IconProps } from "../Icon";

export type IconButtonProps = {
  callback?: () => void;
  children?: ReactNode;
  isFullRounded?: boolean;
} & IconProps;
