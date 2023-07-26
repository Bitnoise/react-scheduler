import { Config, SchedulerData, SchedulerProjectData } from "@/types/global";
import { ParsedDatesRange } from "@/utils/getDatesRange";

export type SchedulerProps = {
  data: SchedulerData;
  onRangeChange?: (range: ParsedDatesRange) => void;
  onItemClick?: (data: SchedulerProjectData) => void;
  onFilterData?: () => void;
  config?: Config;
  startDate?: string;
};

export type StyledOutsideWrapperProps = {
  showScroll: boolean;
};
