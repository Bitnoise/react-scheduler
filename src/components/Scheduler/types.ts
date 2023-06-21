import { Config, SchedulerData } from "@/types/global";
import { ParsedDatesRange } from "@/utils/getDatesRange";

export type SchedulerProps = {
  data: SchedulerData;
  onRangeChange: (range: ParsedDatesRange) => void;
  config?: Config;
};
