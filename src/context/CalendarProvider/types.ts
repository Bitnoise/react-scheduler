import { ReactNode } from "react";
import { Config, SchedulerData, ZoomLevel } from "@/types/global";

export type CalendaryContextType = {
  handleGoNext: () => void;
  handleGoPrev: () => void;
  handleGoToday: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoom: ZoomLevel;
  isNextZoom: boolean;
  isPrevZoom: boolean;
};

export type CalendarProviderProps = {
  children: ReactNode;
  data?: SchedulerData;
  config: Config;
  onRangeChange: () => void;
};
