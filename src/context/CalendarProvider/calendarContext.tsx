import { Context, createContext } from "react";
import dayjs from "dayjs";
import { CalendarContextType } from "./types";

export const calendarContext: Context<CalendarContextType> = createContext<CalendarContextType>({
  handleGoNext: () => {},
  handleScrollNext: () => {},
  handleGoPrev: () => {},
  handleScrollPrev: () => {},
  handleGoToday: () => {},
  zoomIn: () => {},
  zoomOut: () => {},
  changeZoom: () => {},
  handleFilterData: () => {},
  updateTilesCoords: () => {},
  applyScrollAnchor: () => {},
  tilesCoords: [],
  zoom: 0,
  isNextZoom: false,
  isPrevZoom: false,
  date: dayjs(),
  isLoading: false,
  cols: 0,
  startDate: {
    hour: 0,
    dayName: "",
    dayOfMonth: 0,
    weekOfYear: 0,
    month: 0,
    monthName: "",
    isCurrentDay: false,
    isBusinessDay: false,
    year: 0
  },
  dayOfYear: 0,
  recordsThreshold: 0,
  navigation: null,
  config: {
    zoom: 0
  }
});
