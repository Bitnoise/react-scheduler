import { createContext } from "react";
import dayjs from "dayjs";
import { CalendaryContextType } from "./types";

export const calendarContext = createContext<CalendaryContextType>({
  handleGoNext: () => {},
  handleScrollNext: () => {},
  handleGoPrev: () => {},
  handleScrollPrev: () => {},
  handleGoToday: () => {},
  zoomIn: () => {},
  zoomOut: () => {},
  zoom: 0,
  isNextZoom: false,
  isPrevZoom: false,
  date: dayjs(),
  isLoading: false
});
