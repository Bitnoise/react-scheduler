import { allZoomLevel, ZoomLevel } from "./global";

export const isAvailableZoom = (value: number): value is ZoomLevel => {
  return allZoomLevel.includes(value as ZoomLevel);
};
