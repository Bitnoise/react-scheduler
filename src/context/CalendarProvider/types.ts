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
  changeZoom: (zoomLevel: number) => void;
  handleFilterData: () => void;
  updateTilesCoords: (coords: Coords[]) => void;
  /** Shifts the horizontal scroll to compensate the columns added by an infinite scroll load. */
  applyScrollAnchor: () => void;
  onClearFilterData?: () => void;
  data?: SchedulerData;
  tilesCoords: Coords[];
  zoom: ZoomLevel;
  isNextZoom: boolean;
  isPrevZoom: boolean;
  date: dayjs.Dayjs;
  isLoading: boolean;
  cols: number;
  startDate: Day;
  dayOfYear: number;
  recordsThreshold: number;
  config: Config;
  /**
   * Bumped every time handleGoNext/handleGoPrev navigate, paired with the direction,
   * so a consumer can replay a transition each time (a plain state change is not enough
   * when the same direction is pressed twice in a row).
   */
  navigation: { direction: "next" | "prev"; tick: number } | null;
};

export type CalendarProviderProps = {
  children: ReactNode;
  isLoading: boolean;
  defaultStartDate?: dayjs.Dayjs;
  data?: SchedulerData;
  config: Config;
  onRangeChange?: (range: ParsedDatesRange) => void;
  onFilterData?: () => void;
  onClearFilterData?: () => void;
};
