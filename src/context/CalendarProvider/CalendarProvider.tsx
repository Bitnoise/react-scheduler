import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import debounce from "lodash.debounce";
import { Coords, ZoomLevel, allZoomLevel } from "@/types/global";
import { isAvailableZoom } from "@/types/guards";
import { getDatesRange, getParsedDatesRange } from "@/utils/getDatesRange";
import { parseDay } from "@/utils/dates";
import { getCols } from "@/utils/getCols";
import {
  buttonWeeksJump,
  dayWidth,
  outsideWrapperId,
  screenWidthMultiplier,
  scrollWeeksJump,
  weekWidth
} from "@/constants";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps } from "./types";
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(duration);

type Direction = "back" | "forward" | "middle";

const CalendarProvider = ({
  data,
  children,
  isLoading,
  config,
  defaultStartDate = dayjs(),
  onRangeChange,
  onFilterData,
  onClearFilterData
}: CalendarProviderProps) => {
  const { zoom: configZoom, maxRecordsPerPage = 50 } = config;
  const [zoom, setZoom] = useState<ZoomLevel>(configZoom);
  const [date, setDate] = useState(dayjs());
  const [isInitialized, setIsInitialized] = useState(false);
  const [cols, setCols] = useState(getCols(zoom));
  const isNextZoom = allZoomLevel[zoom] !== allZoomLevel[allZoomLevel.length - 1];
  const isPrevZoom = zoom !== 0;
  const range = useMemo(() => getParsedDatesRange(date, zoom), [date, zoom]);
  const startDate = getDatesRange(date, zoom).startDate;
  const dayOfYear = dayjs(startDate).dayOfYear();
  const parsedStartDate = parseDay(startDate);
  const outsideWrapper = useRef<HTMLElement | null>(null);
  const [tilesCoords, setTilesCoords] = useState<Coords[]>([{ x: 0, y: 0 }]);
  const scrollForwardOffsetModifier = 2;

  const moveHorizontalScroll = useCallback(
    (direction: Direction, behavior: ScrollBehavior = "smooth") => {
      switch (direction) {
        case "back":
          return outsideWrapper.current?.scrollTo({
            behavior,
            left: zoom === 0 ? weekWidth * screenWidthMultiplier : dayWidth * screenWidthMultiplier
          });

        case "forward":
          return outsideWrapper.current?.scrollTo({
            behavior,
            left:
              zoom === 0
                ? window.innerWidth +
                  (cols / screenWidthMultiplier -
                    screenWidthMultiplier +
                    scrollForwardOffsetModifier) *
                    weekWidth
                : window.innerWidth +
                  (cols / screenWidthMultiplier -
                    screenWidthMultiplier +
                    scrollForwardOffsetModifier) *
                    dayWidth
          });

        case "middle":
          return outsideWrapper.current?.scrollTo({
            behavior,
            left: window.innerWidth
          });

        default:
          return outsideWrapper.current?.scrollTo({
            behavior,
            left: window.innerWidth
          });
      }
    },
    [cols, zoom]
  );

  const updateTilesCoords = (coords: Coords[]) => {
    setTilesCoords(coords);
  };

  const loadMore = useCallback(
    (direction: Direction) => {
      const load = debounce(() => {
        switch (direction) {
          case "back":
            setDate((prev) => prev.subtract(scrollWeeksJump, "weeks"));
            break;
          case "forward":
            setDate((prev) => prev.add(scrollWeeksJump, "weeks"));
            break;
          case "middle":
            setDate(dayjs());
            break;
        }
        onRangeChange?.(range);
      }, 300);
      load();
    },
    [onRangeChange, range]
  );

  useEffect(() => {
    outsideWrapper.current = document.getElementById(outsideWrapperId);
  }, []);

  useEffect(() => {
    const handleResize = () => setCols(getCols(zoom));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [zoom]);

  useEffect(() => {
    onRangeChange?.(range);
  }, [onRangeChange, range]);

  useEffect(() => {
    // when defaultStartDate changes repaint grid
    setIsInitialized(false);
  }, [defaultStartDate]);

  useEffect(() => {
    if (isInitialized) return;

    moveHorizontalScroll("middle", "auto");
    setIsInitialized(true);
    setDate(defaultStartDate);
  }, [defaultStartDate, isInitialized, moveHorizontalScroll]);

  const handleGoNext = () => {
    if (isLoading) return;

    setDate((prev) => prev.add(buttonWeeksJump, "weeks"));
    onRangeChange?.(range);
  };

  const handleScrollNext = useCallback(() => {
    if (isLoading) return;

    loadMore("forward");
    moveHorizontalScroll("forward");
  }, [isLoading, loadMore, moveHorizontalScroll]);

  const handleGoPrev = () => {
    if (isLoading) return;

    setDate((prev) => prev.subtract(buttonWeeksJump, "weeks"));
    onRangeChange?.(range);
  };

  const handleScrollPrev = useCallback(() => {
    if (!isInitialized || isLoading) return;

    loadMore("back");
    moveHorizontalScroll("back");
  }, [isInitialized, isLoading, loadMore, moveHorizontalScroll]);

  const handleGoToday = useCallback(() => {
    if (isLoading) return;

    loadMore("middle");
    moveHorizontalScroll("middle");
  }, [isLoading, loadMore, moveHorizontalScroll]);

  const zoomIn = () => changeZoom(zoom + 1);

  const zoomOut = () => changeZoom(zoom - 1);

  const changeZoom = (zoomLevel: number) => {
    if (!isAvailableZoom(zoomLevel)) return;
    setZoom(zoomLevel);
    setCols(getCols(zoomLevel));
    onRangeChange?.(range);
  };

  const handleFilterData = () => onFilterData?.();

  const { Provider } = calendarContext;

  return (
    <Provider
      value={{
        data,
        config,
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
        handleFilterData,
        tilesCoords,
        updateTilesCoords,
        recordsThreshold: maxRecordsPerPage,
        onClearFilterData
      }}>
      {children}
    </Provider>
  );
};

const useCalendar = () => useContext(calendarContext);

export default CalendarProvider;
export { useCalendar };
