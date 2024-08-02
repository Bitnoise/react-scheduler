import { useTheme } from "styled-components";
import { Icon } from "@/components";
import { ButtonWrapper } from "./styles";
import { IconButtonProps } from "./types";

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
}: IconButtonProps) => {
  const { colors } = useTheme();

  return (
    <ButtonWrapper
      onClick={onClick}
      isFullRounded={isFullRounded}
      hasChildren={!!children}
      disabled={isDisabled}
      variant={variant}>
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
