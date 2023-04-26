import { Config, SchedulerData } from "@/types/global";

export type SchedulerProps = {
  data: SchedulerData;
  onRangeChange: () => void;
  config?: Config;
};
