export const allZoomLevel = [0, 1] as const;

type ZoomLevelTuple = typeof allZoomLevel;

export type ZoomLevel = ZoomLevelTuple[number];

export type Config = {
  zoom: ZoomLevel;
  isFiltersButtonVisible?: boolean;
};

export type SchedulerData = SchedulerRow[];

export type SchedulerRow = {
  label: SchedulerRowLabel;
  data: SchedulerRowData[];
};
export type SchedulerRowLabel = {
  icon: string;
  title: string;
  subtitle: string;
};
export type SchedulerRowData = {
  startDate: Date;
  endDate: Date;
  title: string;
  subtitle?: string;
  description?: string;
};

export type Day = {
  dayName: string;
  dayOfMonth: number;
  weekOfYear: number;
  month: number;
  monthName: string;
  isBusinessDay: boolean;
  isCurrentDay: boolean;
  year: number;
};

export type TextAndBoxStyleConfig = {
  isCurrent: boolean;
  isBusinessDay?: boolean;
  variant?: "yearView" | "bottomRow";
};

type BottomRowText = {
  y: number;
  label: string;
  font: string;
  color: string;
};

export type DrawRowConfig = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  textYPos?: number;
  label?: string;
  font?: string;
  isBottomRow?: boolean;
  fillStyle?: string;
  topText?: BottomRowText;
  bottomText?: BottomRowText;
};
