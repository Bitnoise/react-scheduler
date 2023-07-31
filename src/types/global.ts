export const allZoomLevel = [0, 1] as const;

type ZoomLevelTuple = typeof allZoomLevel;

export type ZoomLevel = ZoomLevelTuple[number];

export type Config = {
  zoom: ZoomLevel;
  isFiltersButtonVisible?: boolean;
  maxRecordsPerPage?: number;
};

export type SchedulerData = SchedulerRow[];

export type SchedulerRow = {
  id: string;
  label: SchedulerRowLabel;
  data: SchedulerProjectData[];
};

export type PaginatedSchedulerData = PaginatedSchedulerRow[];

export type PaginatedSchedulerRow = {
  id: string;
  label: SchedulerRowLabel;
  data: SchedulerProjectData[][];
};

export type SchedulerRowLabel = {
  icon: string;
  title: string;
  subtitle: string;
};
export type SchedulerProjectData = {
  /**
   * Unique Id of item
   */
  id: string;
  /**
   * Represents start date of from which tile will render
   */
  startDate: Date;
  /**
   * Represents end date to which tile will render
   */
  endDate: Date;
  /**
   * Indicates how much time is spent per day. Given in seconds and converted by Scheduler to hours/minutes
   */
  occupancy: number;
  /**
   * Title of item
   */
  title: string;
  /**
   * Subtitle of item
   */
  subtitle?: string;
  /**
   * Short description displayed on tile. Optional
   */
  description?: string;
  /**
   * Background color of the tile, given in rgb color model. If not given, default color (rgb()) is set.
   */
  bgColor?: string;
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

export type TileProperties = {
  x: number;
  y: number;
  width: number;
};

export type ConfigFormValues = {
  peopleCount: number;
  projectsPerYear: number;
  yearsCovered: number;
  maxRecordsPerPage: number;
  isFullscreen: boolean;
  startDate?: string;
};

export type Coords = {
  x: number;
  y: number;
};

export type TimeUnits = {
  hours: number;
  minutes: number;
};

export type OccupancyData = {
  taken: TimeUnits;
  free: TimeUnits;
  overtime: TimeUnits;
};

export type TooltipData = {
  coords: Coords;
  resourceIndex: number;
  disposition: OccupancyData;
};
