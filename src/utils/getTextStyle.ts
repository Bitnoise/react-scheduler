import { theme } from "@/styles";
import { TextAndBoxStyleConfig } from "@/types/global";

export const getTextStyle = (config: TextAndBoxStyleConfig) => {
  const { isCurrent, isBusinessDay, variant } = config;
  if (isCurrent) return variant === "bottomRow" ? theme.colors.darkGrey : theme.colors.accent;
  if (isBusinessDay) return variant === "bottomRow" ? theme.colors.darkGrey : theme.colors.black;
  return theme.colors.darkGrey;
};
