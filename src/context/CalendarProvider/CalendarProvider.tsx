import { useContext, useState } from "react";
import { calendarContext } from "./calendarContext";
import { CalendarProviderProps, ZoomLevel } from "./types";

const CalendarProvider = ({ children, config }: CalendarProviderProps) => {
  const [zoom, setZoom] = useState<ZoomLevel>(config?.zoom ?? 0);

  const handleGoNext = () => {
    console.log("Handle next");
  };

  const handleGoPrev = () => {
    console.log("Handle prev");
  };

  const handleGoToday = () => {
    console.log("Handle go today");
  };

  const zoomIn = () => {
    console.log("Zoom in");
  };

  const zoomOut = () => {
    console.log("Zoom out");
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
