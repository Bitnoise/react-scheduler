import { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import { ZoomLevel, allZoomLevel } from "@/types/global";
import { isAvailableZoom } from "@/types/guards";
import { weekWidth } from "@/constants";
import { getDatesRange, getParsedDatesRange } from "@/utils/getDatesRange";
import { parseDay } from "@/utils/dates";
import { getCols } from "@/utils/getCols";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps } from "./types";

dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);

const CalendarProvider = ({ children, config, onRangeChange }: CalendarProviderProps) => {
  const [zoom, setZoom] = useState<ZoomLevel>(config.zoom);
  const [date, setDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const isNextZoom = allZoomLevel[zoom] !== allZoomLevel[allZoomLevel.length - 1];
  const isPrevZoom = zoom !== 0;
  const canvasWrapper = document.getElementById("canvasWrapper");
  const range = getParsedDatesRange(date, zoom);
  const scrollOffset = window.innerWidth / 2;
  const cols = getCols(zoom);
  const startDate = getDatesRange(date, zoom).startDate;
  const dayOfYear = dayjs(startDate).dayOfYear();
  const parsedStartDate = parseDay(startDate);

  useEffect(() => {
    if (!canvasWrapper) return;
    window.scrollTo({
      behavior: "auto",
      left: window.innerWidth + 4 * weekWidth
    });
  }, [canvasWrapper]);

  const handleGoNext = () => {
    setIsLoading(true);
    setDate((prev) => prev.add(2, "months"));
    onRangeChange(range);
    setIsLoading(false);
  };

  const handleScrollNext = useCallback(() => {
    setIsLoading(true);
    window.scroll({
      behavior: "smooth",
      left: scrollOffset
    });
    setDate((prev) => prev.add(5, "weeks"));
    onRangeChange(range);
    setIsLoading(false);
  }, [onRangeChange, range, scrollOffset]);

  const handleGoPrev = () => {
    setIsLoading(true);
    setDate((prev) => prev.subtract(2, "months"));
    onRangeChange(range);
    setIsLoading(false);
  };

  const handleScrollPrev = useCallback(() => {
    setIsLoading(true);
    window.scrollTo({ behavior: "smooth", left: scrollOffset });
    setDate((prev) => prev.subtract(5, "weeks"));
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
    onRangeChange(range);
  };

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
        dayOfYear
      }}>
      {children}
    </Provider>
  );
};

const useCalendar = () => useContext(calendarContext);

export default CalendarProvider;
export { useCalendar };
