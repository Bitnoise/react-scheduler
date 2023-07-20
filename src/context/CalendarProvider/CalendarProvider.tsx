import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";
import debounce from "lodash.debounce";
import { Coords, ZoomLevel, allZoomLevel } from "@/types/global";
import { isAvailableZoom } from "@/types/guards";
import { getDatesRange, getParsedDatesRange } from "@/utils/getDatesRange";
import { parseDay } from "@/utils/dates";
import { getCols } from "@/utils/getCols";
import { dayWidth, outsideWrapperId, screenWidthMultiplier, weekWidth } from "@/constants";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps } from "./types";
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);

type Direction = "back" | "forward" | "middle";
const CalendarProvider = ({
  children,
  config,
  onRangeChange,
  onFilterData
}: CalendarProviderProps) => {
  const [zoom, setZoom] = useState<ZoomLevel>(config.zoom);
  const [date, setDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
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
    (direction: Direction) => {
      switch (direction) {
        case "back":
          return outsideWrapper.current?.scrollTo({
            behavior: "smooth",
            left: zoom === 0 ? weekWidth * screenWidthMultiplier : dayWidth * screenWidthMultiplier
          });

        case "forward":
          return outsideWrapper.current?.scrollTo({
            behavior: "smooth",
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
            behavior: "smooth",
            left: window.innerWidth
          });

        default:
          return outsideWrapper.current?.scrollTo({
            behavior: "smooth",
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
        direction === "forward"
          ? setDate((prev) => prev.add(4, "weeks"))
          : setDate((prev) => prev.subtract(4, "weeks"));
        onRangeChange(range);
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
    onRangeChange(range);
  }, [onRangeChange, range]);

  const handleGoNext = () => {
    setIsLoading(true);
    setDate((prev) => prev.add(2, "weeks"));
    onRangeChange(range);
    setIsLoading(false);
  };

  const handleScrollNext = useCallback(() => {
    setIsLoading(true);
    loadMore("forward");
    moveHorizontalScroll("forward");
    // Timeout is set for testers
    setTimeout(() => setIsLoading(false), 1500);
  }, [loadMore, moveHorizontalScroll]);

  const handleGoPrev = () => {
    setIsLoading(true);
    setDate((prev) => prev.subtract(2, "weeks"));
    onRangeChange(range);
    setIsLoading(false);
  };

  const handleScrollPrev = useCallback(() => {
    if (isInitialized) {
      setIsLoading(true);
      loadMore("back");
      moveHorizontalScroll("back");
      // Timeout is set for testers
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [isInitialized, loadMore, moveHorizontalScroll]);

  const handleGoToday = useCallback(() => {
    moveHorizontalScroll("middle");
    onRangeChange(range);
  }, [moveHorizontalScroll, onRangeChange, range]);

  const handleGoToInitialView = useCallback(() => {
    if (!isInitialized) {
      moveHorizontalScroll("middle");
      setIsInitialized(true);
    }
  }, [isInitialized, moveHorizontalScroll]);

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
        handleFilterData,
        tilesCoords,
        updateTilesCoords,
        handleGoToInitialView
      }}>
      {children}
    </Provider>
  );
};

const useCalendar = () => useContext(calendarContext);

export default CalendarProvider;
export { useCalendar };
