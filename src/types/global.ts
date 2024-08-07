import { LocaleType } from "@/context/LocaleProvider/types";
import { ColorType } from "@/styles";

export const allZoomLevel = [0, 1, 2] as const;

export type FilterButtonState = -1 | 0 | 1;

type ZoomLevelTuple = typeof allZoomLevel;

export type ZoomLevel = ZoomLevelTuple[number];

export type LangCodes = "en" | "pl" | "de" | "lt";

export type Config = {
  zoom: ZoomLevel;
  /**
   * Dictates filter button behavior
   * - `< 0` - filter button is hidden
   * - `0` - filter button is visible, no filter had been applied
   * - `> 0` - filter button visible - filters had been applied
   */
  filterButtonState?: number;
  /**
   * Language code: "en" | "pl" | "de"
   */
  lang?: LangCodes | string;
  isFiltersButtonVisible?: boolean;
  maxRecordsPerPage?: number;
  /**
   * property for changing behavior of showing tooltip hours
   * true - will show taken hours same as business days
   * false - will always show 0 taken hours on weekends in day view
   * @default false
   */
  includeTakenHoursOnWeekendsInDayView?: boolean;

  /**
   * show tooltip when hovering over tiles items
   * @default true
   */
  showTooltip?: boolean;
  translations?: LocaleType[];
  /**
   * show toggle button for changing theme (light/dark)
   */
  showThemeToggle?: boolean;
  /**
   * default theme (light/dark)
   * when theme toggle is displayed - this is a default value of the toggle
   * @default "light"
   */
  defaultTheme?: "light" | "dark";
  theme?: Theme;
};

export type Theme = {
  light?: Partial<Record<ColorType, string>>;
  dark?: Partial<Record<ColorType, string>>;
};

export type SchedulerData = SchedulerRow[];

export type SchedulerRow = {
  id: string;
  label: SchedulerRowLabel;
  data: SchedulerProjectData[];
};

export type SchedulerItemClickData = Omit<SchedulerRow, "data">;

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
   * Subtitle of item. Optional
   */
  subtitle?: string;
  /**
   * Short description displayed on tile. Optional
   */
  description?: string;
  /**
   * Background color of the tile, given in rgb color model. If not given, default color (rgb(114, 141,226 )) is set. Optional
   */
  bgColor?: string;
};

export type Day = {
  hour: number;
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
  labelBetweenCells?: boolean;
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
