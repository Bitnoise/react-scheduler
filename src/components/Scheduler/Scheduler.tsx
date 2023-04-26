import { Calendar, Topbar } from "@/components";
import CalendarProvider from "@/context/CalendarProvider";
import { Config } from "@/types/global";
import { SchedulerProps } from "./types";

const Scheduler = ({ data, config, onRangeChange }: SchedulerProps) => {
  const appConfig: Config = {
    zoom: 0,
    isFiltersVisible: true,
    ...config
  };

  return (
    <CalendarProvider data={data} config={appConfig} onRangeChange={onRangeChange}>
      <Topbar />
      <Calendar />;
    </CalendarProvider>
  );
};

export default Scheduler;
