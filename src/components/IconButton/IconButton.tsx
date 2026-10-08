import { useTheme } from "styled-components";
import { Icon } from "@/components";
import { ButtonWrapper } from "./styles";
import { IconButtonProps } from "./types";
import { JSX } from "react";

const IconButton = ({
  iconName,
  width,
  height,
  fill,
  className,
  onClick,
  children,
  isFullRounded,
  isDisabled,
  variant = "outlined"
}: IconButtonProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <ButtonWrapper
      onClick={onClick}
      $isFullRounded={isFullRounded}
      $hasChildren={!!children}
      disabled={isDisabled}
      $variant={variant}
    >
      <Icon
        iconName={iconName}
        width={width}
        height={height}
        fill={isDisabled ? colors.disabled : fill}
        className={className}
      />
      {children}
    </ButtonWrapper>
  );
};
export default IconButton;
