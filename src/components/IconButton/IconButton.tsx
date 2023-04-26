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
  isFullRounded
}: IconButtonProps) => {
  return (
    <ButtonWrapper onClick={onClick} isFullRounded={isFullRounded} hasChildren={!!children}>
      <Icon iconName={iconName} width={width} height={height} fill={fill} className={className} />
      {children}
    </ButtonWrapper>
  );
};
export default IconButton;
