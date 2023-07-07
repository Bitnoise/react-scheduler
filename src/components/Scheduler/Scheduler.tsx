import { ThemeProvider } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components";
import CalendarProvider from "@/context/CalendarProvider";
import LocaleProvider from "@/context/LocaleProvider";
import { theme } from "@/styles";
import { Config } from "@/types/global";
import { outsideWrapperId } from "@/constants";
import { SchedulerProps } from "./types";
import { StyledInnerWrapper, StyledOutsideWrapper } from "./styles";

const Scheduler = ({ data, config, onRangeChange, onItemClick, onFilterData }: SchedulerProps) => {
  const appConfig: Config = {
    zoom: 0,
    isFiltersButtonVisible: true,
    ...config
  };

  const outsideWrapperRef = useRef<HTMLDivElement>(null);
  const [topBarWidth, setTopBarWidth] = useState(outsideWrapperRef.current?.clientWidth);

  useEffect(() => {
    const handleResize = () => {
      if (outsideWrapperRef.current) {
        setTopBarWidth(outsideWrapperRef.current.clientWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!outsideWrapperRef.current) null;
  return (
    <ThemeProvider theme={theme}>
      <LocaleProvider>
        <CalendarProvider
          data={data}
          config={appConfig}
          onRangeChange={onRangeChange}
          onFilterData={onFilterData}>
          <StyledOutsideWrapper id={outsideWrapperId} ref={outsideWrapperRef}>
            <StyledInnerWrapper>
              <Calendar data={data} onItemClick={onItemClick} topBarWidth={topBarWidth ?? 0} />
            </StyledInnerWrapper>
          </StyledOutsideWrapper>
        </CalendarProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
};

export default Scheduler;
