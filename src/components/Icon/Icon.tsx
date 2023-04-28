import { useTheme } from "styled-components";
import icons from "@/assets/icons";
import { IconProps } from "./types";

const Icon = ({ iconName, width, height, fill, className }: IconProps) => {
  const { colors } = useTheme();

  const IconComponent = icons[iconName];

  if (!IconComponent) return null;

  return (
    <IconComponent
      style={{ transition: ".5s ease" }}
      fill={fill ?? colors.accent}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Icon;
