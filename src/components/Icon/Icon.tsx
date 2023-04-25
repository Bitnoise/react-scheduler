import icons from "@/assets/icons";
import { IconProps } from "./types";

const Icon = ({ iconName, width, height, fill, className }: IconProps) => {
  const IconComponent = icons[iconName];

  if (!IconComponent) return null;

  return <IconComponent fill={fill} width={width} height={height} className={className} />;
};

export default Icon;
