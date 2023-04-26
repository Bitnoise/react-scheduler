import { useContext, useState } from "react";
import { ZoomLevel } from "@/types/global";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps } from "./types";

const CalendarProvider = ({ children, config, data, onRangeChange }: CalendarProviderProps) => {
  const [zoom, setZoom] = useState<ZoomLevel>(config.zoom);

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

  const zoomIn = () => {
    console.log("Zoom in");
    onRangeChange();
  };

  const zoomOut = () => {
    console.log("Zoom out");
    onRangeChange();
  };

  const { Provider } = calendarContext;

  return (
    <Provider value={{ handleGoNext, handleGoPrev, handleGoToday, zoomIn, zoomOut, zoom }}>
      {children}
    </Provider>
  );
};

const useCalendar = () => useContext(calendarContext);

export default CalendarProvider;
export { useCalendar };
