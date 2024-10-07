import { CustomTooltipFunction, TooltipData } from "@/types/global";

export type TooltipProps = {
  tooltipData: TooltipData;
  zoom: number;
  customTooltip?: CustomTooltipFunction;
};
