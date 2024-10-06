import { CustomTooltipFunction, SchedulerProjectData, TooltipData } from "@/types/global";

export type TooltipProps = {
  tooltipData: TooltipData;
  zoom: number;
  project?: SchedulerProjectData;
  customTooltip?: CustomTooltipFunction;
};
