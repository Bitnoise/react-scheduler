import { Theme } from "@/styles";
import { TextAndBoxStyleConfig } from "@/types/global";

// variant "bottomRow" is the secondary (small) label of a header cell
export const getTextStyle = (config: TextAndBoxStyleConfig, theme: Theme): string => {
  const { isCurrent, isBusinessDay, variant } = config;
  if (isCurrent) return variant === "bottomRow" ? theme.colors.accent : "#FFFFFF";
  if (isBusinessDay && variant !== "bottomRow") return theme.colors.textPrimary;

  return theme.colors.placeholder;
};
