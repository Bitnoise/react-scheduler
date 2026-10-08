import {
  JSX,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
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
import { getCols, getVisibleCols } from "@/utils/getCols";
import {
  buttonWeeksJump,
  hoursInDay,
  outsideWrapperId,
  screenWidthMultiplier,
  zoom2ButtonJump
} from "@/constants";
import { getCanvasWidth } from "@/utils/getCanvasWidth";
import { getCellTimeUnit, getCellWidth } from "@/utils/zoomUnits";
import { calendarContext } from "./calendarContext";
import { CalendarContextType, CalendarProviderProps } from "./types";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
import isLeapYear from "dayjs/plugin/isLeapYear";

dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

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
}: CalendarProviderProps): JSX.Element => {
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
  const [navigation, setNavigation] = useState<CalendarContextType["navigation"]>(null);

  const moveHorizontalScroll = useCallback(
    (direction: Direction, behavior: ScrollBehavior = "auto") => {
      const canvasWidth = getCanvasWidth();
      switch (direction) {
        case "middle": {
          const leftOffset = canvasWidth / screenWidthMultiplier / 4; // 1/4 of component's width
          return outsideWrapper.current?.scrollTo({
            behavior,
            left: canvasWidth / 2 - leftOffset
          });
        }

        default:
          return outsideWrapper.current?.scrollTo({
            behavior,
            left: canvasWidth / 2
          });
      }
    },
    []
  );

  // start date shown before an infinite scroll load, used to shift the scroll position by
  // exactly the width of the added columns so the visible dates don't jump
  const scrollAnchor = useRef<Date | null>(null);
  const currentStart = useRef({ startDate, zoom });
  currentStart.current = { startDate, zoom };

  const applyScrollAnchor = useCallback(() => {
    const anchor = scrollAnchor.current;
    const scroller = outsideWrapper.current;
    const { startDate: newStartDate, zoom: currentZoom } = currentStart.current;
    if (!anchor || !scroller || anchor.getTime() === newStartDate.valueOf()) return;

    scrollAnchor.current = null;
    const shift =
      newStartDate.diff(anchor, getCellTimeUnit(currentZoom), true) * getCellWidth(currentZoom);
    scroller.scrollLeft -= Math.round(shift);
  }, []);

  // children (header canvas) apply it before drawing, this is the fallback when none did
  const startTime = startDate.valueOf();
  useLayoutEffect(() => {
    applyScrollAnchor();
  }, [applyScrollAnchor, startTime]);

  const updateTilesCoords = (coords: Coords[]) => {
    setTilesCoords(coords);
  };

  const loadMore = useCallback(
    (direction: Direction) => {
      const cols = getVisibleCols(zoom);
      let weekOffset: number;
      let offset: number;
      switch (zoom) {
        case 0:
          weekOffset = cols * 7;
          offset = Math.round(weekOffset);
          if (offset % 2 !== 0) {
            offset += offset > weekOffset ? 2 : 5;
          }
          break;
        case 1:
          offset = cols;
          break;
        case 2:
          offset = Math.ceil(cols / hoursInDay);
          break;
      }
      switch (direction) {
        case "back":
          scrollAnchor.current = currentStart.current.startDate.toDate();
          setDate((prev) => prev.subtract(offset, "days"));
          break;
        case "forward":
          scrollAnchor.current = currentStart.current.startDate.toDate();
          setDate((prev) => prev.add(offset, "days"));
          break;
        case "middle":
          scrollAnchor.current = null;
          setDate(dayjs());
          break;
      }
    },
    [zoom]
  );

  useEffect(() => {
    const element = document.getElementById(outsideWrapperId);
    outsideWrapper.current = element;
    setCols(getCols(zoom));

    if (!element) return;

    const observer = new ResizeObserver(() => {
      const newCols = getCols(zoom);
      setCols((prevCols) => (prevCols !== newCols ? newCols : prevCols));
    });

    observer.observe(element);

    return () => observer.disconnect();
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

    moveHorizontalScroll("middle");
    setIsInitialized(true);
    setDate(defaultStartDate);
  }, [defaultStartDate, isInitialized, moveHorizontalScroll]);

  const handleGoNext = () => {
    if (isLoading) return;

    setDate((prev) =>
      zoom === 2 ? prev.add(zoom2ButtonJump, "hours") : prev.add(buttonWeeksJump, "weeks")
    );
    setNavigation((prev) => ({ direction: "next", tick: (prev?.tick ?? 0) + 1 }));
    onRangeChange?.(range);
  };

  // infinite scroll keeps loading while a previous range is still loading: when the scroll goes past
  // the loading range, onRangeChange is called again with the new one, the consumer can cancel the
  // pending request
  const handleScrollNext = useCallback(() => {
    loadMore("forward");
  }, [loadMore]);

  const handleGoPrev = () => {
    if (isLoading) return;

    setDate((prev) =>
      zoom === 2 ? prev.subtract(zoom2ButtonJump, "hours") : prev.subtract(buttonWeeksJump, "weeks")
    );
    setNavigation((prev) => ({ direction: "prev", tick: (prev?.tick ?? 0) + 1 }));
    onRangeChange?.(range);
  };

  const handleScrollPrev = useCallback(() => {
    if (!isInitialized) return;
    loadMore("back");
  }, [isInitialized, loadMore]);

  const handleGoToday = useCallback(() => {
    if (isLoading) return;

    loadMore("middle");
    debounce(() => {
      moveHorizontalScroll("middle", "smooth");
    }, 300)();
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
        changeZoom,
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
        applyScrollAnchor,
        navigation,
        recordsThreshold: maxRecordsPerPage,
        onClearFilterData
      }}
    >
      {children}
    </Provider>
  );
};

const useCalendar = (): CalendarContextType => useContext(calendarContext);

export default CalendarProvider;
export { useCalendar };
