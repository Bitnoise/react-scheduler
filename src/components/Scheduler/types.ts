import {
  CellClickData,
  CellRangeSelectData,
  Config,
  SchedulerData,
  SchedulerItemClickData,
  SchedulerProjectData,
  SelectedRange,
  TileMoveData
} from "@/types/global";
import { ParsedDatesRange } from "@/utils/getDatesRange";

export type SchedulerProps = {
  data: SchedulerData;
  isLoading?: boolean;
  config?: Config;
  startDate?: string;
  onRangeChange?: (range: ParsedDatesRange) => void;
  onTileClick?: (data: SchedulerProjectData) => void;
  onFilterData?: () => void;
  onClearFilterData?: () => void;
  onItemClick?: (data: SchedulerItemClickData) => void;
  /**
   * Fired when clicking an empty cell (a resource row on a given date with no tile),
   * without dragging to a different date
   */
  onCellClick?: (data: CellClickData) => void;
  /**
   * Fired when dragging across several empty cells on the same resource row, from
   * mouse down to mouse up
   */
  onCellRangeSelect?: (data: CellRangeSelectData) => void;
  /**
   * Fired when a tile is dragged and dropped onto a new cell, to reschedule it (and
   * optionally reassign it to a different resource row)
   */
  onTileMove?: (data: TileMoveData) => void;
  /**
   * A cell or range to highlight, e.g. the last selection made via onCellClick/onCellRangeSelect
   */
  selectedCell?: SelectedRange | null;
};

export type StyledOutsideWrapperProps = {
  $showScroll: boolean;
};
