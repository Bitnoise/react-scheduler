import { theme } from "@/styles";
import { TextAndBoxStyleConfig } from "@/types/global";

export const getTextStyle = (config: TextAndBoxStyleConfig) => {
  const { isCurrent, isBusinessDay, variant } = config;
  if (isCurrent) return variant === "bottomRow" ? theme.colors.grey600 : theme.colors.blue400;
  if (isBusinessDay) return variant === "bottomRow" ? theme.colors.grey600 : theme.colors.black;
  return theme.colors.grey600;
};
