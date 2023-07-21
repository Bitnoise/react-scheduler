import { ReactNode } from "react";
import dayjs from "dayjs";
import { Config, Coords, Day, SchedulerData, ZoomLevel } from "@/types/global";
import { ParsedDatesRange } from "@/utils/getDatesRange";

export type CalendarContextType = {
  handleGoNext: () => void;
  handleScrollNext: () => void;
  handleGoPrev: () => void;
  handleScrollPrev: () => void;
  handleGoToday: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  handleFilterData: () => void;
  updateTilesCoords: (coords: Coords[]) => void;
  tilesCoords: Coords[];
  zoom: ZoomLevel;
  isNextZoom: boolean;
  isPrevZoom: boolean;
  date: dayjs.Dayjs;
  isLoading: boolean;
  cols: number;
  startDate: Day;
  dayOfYear: number;
};

export type CalendarProviderProps = {
  children: ReactNode;
  data?: SchedulerData;
  config: Config;
  onRangeChange?: (range: ParsedDatesRange) => void;
  onFilterData?: () => void;
};
