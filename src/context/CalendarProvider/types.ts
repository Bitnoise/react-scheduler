import { ReactNode } from "react";

export type ZoomLevel = 0 | 1;

export type CalendaryContextType = {
  handleGoNext: () => void;
  handleGoPrev: () => void;
  handleGoToday: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoom: ZoomLevel;
};

export type CalendarProviderProps = {
  children: ReactNode;
  config?: {
    zoom: ZoomLevel;
  };
};
