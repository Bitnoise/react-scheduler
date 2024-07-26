import { Theme } from "@/styles";
import { TextAndBoxStyleConfig } from "@/types/global";

export const getTextStyle = (config: TextAndBoxStyleConfig, theme: Theme) => {
  const { isCurrent, isBusinessDay, variant } = config;
  if (isCurrent) return variant === "bottomRow" ? theme.colors.placeholder : theme.colors.accent;
  if (isBusinessDay)
    return variant === "bottomRow" ? theme.colors.placeholder : theme.colors.textPrimary;

  return theme.colors.placeholder;
};
