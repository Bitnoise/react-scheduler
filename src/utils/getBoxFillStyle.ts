import { getCanvasColors, Theme } from "@/styles";
import { TextAndBoxStyleConfig } from "@/types/global";

export const getBoxFillStyle = (config: TextAndBoxStyleConfig, theme: Theme): string => {
  const { isCurrent, isBusinessDay, variant } = config;
  const colors = getCanvasColors(theme);
  if (isCurrent) return colors.today;
  if (variant !== "yearView" && !isBusinessDay) return colors.weekend;

  return theme.colors.gridBackground;
};
