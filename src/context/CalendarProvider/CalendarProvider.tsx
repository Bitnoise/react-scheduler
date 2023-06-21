import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { ZoomLevel, allZoomLevel } from "@/types/global";
import { isAvailableZoom } from "@/types/guards";
import { weekWidth } from "@/constants";
import { getParsedDatesRange } from "@/utils/getDatesRange";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps } from "./types";

const CalendarProvider = ({ children, config, onRangeChange }: CalendarProviderProps) => {
  const [zoom, setZoom] = useState<ZoomLevel>(config.zoom);
  const [date, setDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const isNextZoom = allZoomLevel[zoom] !== allZoomLevel[allZoomLevel.length - 1];
  const isPrevZoom = zoom !== 0;
  const canvasWrapper = document.getElementById("canvasWrapper");
  const range = getParsedDatesRange(date, zoom);

  useEffect(() => {
    if (!canvasWrapper) return;
    canvasWrapper.scrollTo({
      behavior: "auto",
      left: canvasWrapper.clientWidth + 4 * weekWidth
    });
  }, [canvasWrapper]);

  useEffect(() => {
    onRangeChange(range);
  }, [onRangeChange, range, zoom]);

  const handleGoNext = () => {
    setIsLoading(true);
    setDate((prev) => prev.add(2, "months"));
    onRangeChange(range);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleScrollNext = () => {
    setIsLoading(true);
    setDate((prev) => prev.add(5, "weeks"));
    canvasWrapper?.scroll({ behavior: "smooth", left: canvasWrapper.clientWidth / 0.5 });
    onRangeChange(range);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleGoPrev = () => {
    setIsLoading(true);
    setDate((prev) => prev.subtract(2, "months"));
    onRangeChange(range);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleScrollPrev = () => {
    setIsLoading(true);
    setDate((prev) => prev.subtract(5, "weeks"));
    canvasWrapper?.scroll({
      behavior: "smooth",
      left: canvasWrapper.clientWidth - canvasWrapper.clientWidth / 2
    });
    onRangeChange(range);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleGoToday = () => {
    setDate(dayjs());
    canvasWrapper?.scroll({ behavior: "smooth", left: canvasWrapper.clientWidth + weekWidth });
    onRangeChange(range);
  };

  const zoomIn = () => changeZoom(zoom + 1);

  const zoomOut = () => changeZoom(zoom - 1);

  const changeZoom = (zoomLevel: number) => {
    if (!isAvailableZoom(zoomLevel)) return;
    setZoom(zoomLevel);
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
        isLoading
      }}>
      {children}
    </Provider>
  );
};

const useCalendar = () => useContext(calendarContext);

export default CalendarProvider;
export { useCalendar };
