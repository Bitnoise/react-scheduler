import {
  CellClickData,
  CellRangeSelectData,
  PaginatedSchedulerData,
  SchedulerProjectData,
  SelectedRange,
  TileMoveData
} from "@/types/global";

export type GridProps = {
  zoom: number;
  rows: number;
  data: PaginatedSchedulerData;
  onTileClick?: (data: SchedulerProjectData) => void;
  onCellClick?: (data: CellClickData) => void;
  onCellRangeSelect?: (data: CellRangeSelectData) => void;
  onTileMove?: (data: TileMoveData) => void;
  /**
   * A cell or range to highlight (e.g. the last selection made via onCellClick/onCellRangeSelect)
   */
  selectedCell?: SelectedRange | null;
};

export type StyledSpanProps = {
  $position: "left" | "right";
};
