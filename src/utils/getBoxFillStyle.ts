import { daysFillStyle } from "@/constants";
import { theme } from "@/styles";
import { TextAndBoxStyleConfig } from "@/types/global";

export const getBoxFillStyle = (config: TextAndBoxStyleConfig) => {
  const { isCurrent, isBusinessDay, variant } = config;
  if (variant === "yearView") return isCurrent ? theme.colors.accentLight : daysFillStyle;
  if (isCurrent) return theme.colors.accentLight;
  if (!isBusinessDay) return theme.colors.hover;

  return daysFillStyle;
};
