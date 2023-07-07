import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";
import debounce from "lodash.debounce";
import { ZoomLevel, allZoomLevel } from "@/types/global";
import { isAvailableZoom } from "@/types/guards";
import { getDatesRange, getParsedDatesRange } from "@/utils/getDatesRange";
import { parseDay } from "@/utils/dates";
import { getCols } from "@/utils/getCols";
import { outsideWrapperId } from "@/constants";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps } from "./types";
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);

type Direction = "prev" | "next";

const CalendarProvider = ({
  children,
  config,
  onRangeChange,
  onFilterData
}: CalendarProviderProps) => {
  const outsideWrapper = document.getElementById(outsideWrapperId);
  const [zoom, setZoom] = useState<ZoomLevel>(config.zoom);
  const [date, setDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [cols, setCols] = useState(getCols(zoom));
  const isNextZoom = allZoomLevel[zoom] !== allZoomLevel[allZoomLevel.length - 1];
  const isPrevZoom = zoom !== 0;
  const range = useMemo(() => getParsedDatesRange(date, zoom), [date, zoom]);
  const startDate = getDatesRange(date, zoom).startDate;
  const dayOfYear = dayjs(startDate).dayOfYear();
  const parsedStartDate = parseDay(startDate);
  const scrollToMiddle = useCallback(
    () => outsideWrapper?.scrollTo({ behavior: "smooth", left: window.innerWidth }),
    [outsideWrapper]
  );

  const loadMore = useCallback(
    (direction: Direction) => {
      const load = debounce(() => {
        direction === "next"
          ? setDate((prev) => prev.add(2, "weeks"))
          : setDate((prev) => prev.subtract(2, "weeks"));
        onRangeChange(range);
      }, 300);
      load();
    },
    [onRangeChange, range]
  );

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

    loadMore("next");
    scrollToMiddle();

    setIsLoading(false);
  }, [loadMore, scrollToMiddle]);

  const handleGoPrev = () => {
    setIsLoading(true);
    setDate((prev) => prev.subtract(1, "months"));
    onRangeChange(range);
    setIsLoading(false);
  };

  const handleScrollPrev = useCallback(() => {
    setIsLoading(true);
    loadMore("prev");
    scrollToMiddle();
    setIsLoading(false);
  }, [loadMore, scrollToMiddle]);

  const handleGoToday = () => {
    setDate(dayjs());
    scrollToMiddle();
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
