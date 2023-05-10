import { ThemeProvider } from "styled-components";
import { Calendar, Topbar } from "@/components";
import CalendarProvider from "@/context/CalendarProvider";
import LocaleProvider from "@/context/LocaleProvider";
import { theme } from "@/styles";
import { Config } from "@/types/global";
import { SchedulerProps } from "./types";

const Scheduler = ({ data, config, onRangeChange }: SchedulerProps) => {
  const appConfig: Config = {
    zoom: 0,
    isFiltersButtonVisible: true,
    ...config
  };
  return (
    <ThemeProvider theme={theme}>
      <LocaleProvider>
        <CalendarProvider data={data} config={appConfig} onRangeChange={onRangeChange}>
          <Topbar />
          <Calendar data={data} />
        </CalendarProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
};

export default Scheduler;
