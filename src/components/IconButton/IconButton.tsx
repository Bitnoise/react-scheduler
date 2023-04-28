import { Icon } from "@/components";
import { ButtonWrapper } from "./styles";
import { IconButtonProps } from "./types";

const IconButton = ({
  iconName,
  width,
  height,
  fill,
  className,
  onClick = () => {},
  children,
  isFullRounded,
  isDisabled
}: IconButtonProps) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      isFullRounded={isFullRounded}
      hasChildren={!!children}
      disabled={isDisabled}
    >
      <Icon
        iconName={iconName}
        width={width}
        height={height}
        fill={isDisabled ? "#777777" : fill}
        className={className}
      />
      {children}
    </ButtonWrapper>
  );
};
export default IconButton;
