import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";
import { ZoomLevel, allZoomLevel } from "@/types/global";
import { isAvailableZoom } from "@/types/guards";
import { getDatesRange, getParsedDatesRange } from "@/utils/getDatesRange";
import { parseDay } from "@/utils/dates";
import { getCols } from "@/utils/getCols";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps } from "./types";

dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);

const CalendarProvider = ({
  children,
  config,
  onRangeChange,
  onFilterData
}: CalendarProviderProps) => {
  const [zoom, setZoom] = useState<ZoomLevel>(config.zoom);
  const [date, setDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [cols, setCols] = useState(getCols(zoom));
  const isNextZoom = allZoomLevel[zoom] !== allZoomLevel[allZoomLevel.length - 1];
  const isPrevZoom = zoom !== 0;
  const range = useMemo(() => getParsedDatesRange(date, zoom), [date, zoom]);
  const scrollOffset = window.innerWidth / 2;
  const startDate = getDatesRange(date, zoom).startDate;
  const dayOfYear = dayjs(startDate).dayOfYear();
  const parsedStartDate = parseDay(startDate);

  useEffect(() => {
    const handleResize = () => setCols(getCols(zoom));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [zoom]);

  useEffect(() => {
    onRangeChange(range);
  }, [onRangeChange, range]);

  const handleGoNext = () => {
    setIsLoading(true);
    setDate((prev) => prev.add(1, "months"));
    onRangeChange(range);
    setIsLoading(false);
  };

  const handleScrollNext = useCallback(() => {
    setIsLoading(true);
    window.scroll({
      behavior: "smooth",
      left: scrollOffset
    });
    setDate((prev) => prev.add(2, "weeks"));
    onRangeChange(range);
    setIsLoading(false);
  }, [onRangeChange, range, scrollOffset]);

  const handleGoPrev = () => {
    setIsLoading(true);
    setDate((prev) => prev.subtract(1, "months"));
    onRangeChange(range);
    setIsLoading(false);
  };

  const handleScrollPrev = useCallback(() => {
    setIsLoading(true);
    window.scrollTo({ behavior: "smooth", left: scrollOffset });
    setDate((prev) => prev.subtract(2, "weeks"));
    onRangeChange(range);
    setIsLoading(false);
  }, [onRangeChange, range, scrollOffset]);

  const handleGoToday = () => {
    setDate(dayjs());
    window.scrollTo({ behavior: "smooth", left: window.innerWidth });
    onRangeChange(range);
  };

  const zoomIn = () => changeZoom(zoom + 1);

  const zoomOut = () => changeZoom(zoom - 1);

  const changeZoom = (zoomLevel: number) => {
    if (!isAvailableZoom(zoomLevel)) return;
    setZoom(zoomLevel);
    setCols(getCols(zoomLevel));
    onRangeChange(range);
  };

  const handleFilterData = () => onFilterData();

  const { Provider } = calendarContext;

  return (
    <Provider
      value={{
        handleGoNext,
        handleScrollNext,
        handleGoPrev,
        handleScrollPrev,
        handleGoToday,
        zoomIn,
        zoomOut,
        zoom,
        isNextZoom,
        isPrevZoom,
        date,
        isLoading,
        cols,
        startDate: parsedStartDate,
        dayOfYear,
        handleFilterData
      }}>
      {children}
    </Provider>
  );
};

const useCalendar = () => useContext(calendarContext);

export default CalendarProvider;
export { useCalendar };
