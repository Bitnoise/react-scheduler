import icons from "@/assets/icons";

export type IconProps = {
  iconName: keyof typeof icons;
  fill?: string;
  width?: string;
  height?: string;
  className?: string;
};
