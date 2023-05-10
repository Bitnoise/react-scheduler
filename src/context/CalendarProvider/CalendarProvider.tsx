import { useContext, useEffect, useState } from "react";
import { ZoomLevel, allZoomLevel } from "@/types/global";
import { isAvailableZoom } from "@/types/guards";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps } from "./types";

const CalendarProvider = ({ children, config, onRangeChange }: CalendarProviderProps) => {
  const [zoom, setZoom] = useState<ZoomLevel>(config.zoom);
  const isNextZoom = allZoomLevel[zoom] !== allZoomLevel[allZoomLevel.length - 1];
  const isPrevZoom = zoom !== 0;
  console.log("ZOOM", zoom);
  useEffect(() => {
    onRangeChange();
  }, [onRangeChange, zoom]);

  const handleGoNext = () => {
    console.log("Handle next");
    onRangeChange();
  };

  const handleGoPrev = () => {
    console.log("Handle prev");
    onRangeChange();
  };

  const handleGoToday = () => {
    console.log("Handle go today");
    onRangeChange();
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
        handleGoPrev,
        handleGoToday,
        zoomIn,
        zoomOut,
        zoom,
        isNextZoom,
        isPrevZoom
      }}>
      {children}
    </Provider>
  );
};

const useCalendar = () => useContext(calendarContext);

export default CalendarProvider;
export { useCalendar };
