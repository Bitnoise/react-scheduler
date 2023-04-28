import { createContext } from "react";
import { CalendaryContextType } from "./types";

export const calendarContext = createContext<CalendaryContextType>({
  handleGoNext: () => {},
  handleGoPrev: () => {},
  handleGoToday: () => {},
  zoomIn: () => {},
  zoomOut: () => {},
  zoom: 0,
  isNextZoom: false,
  isPrevZoom: false
});
