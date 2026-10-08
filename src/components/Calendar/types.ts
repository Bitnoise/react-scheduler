import {
  CellClickData,
  CellRangeSelectData,
  SchedulerData,
  SchedulerItemClickData,
  SchedulerProjectData,
  SelectedRange,
  TileMoveData
} from "@/types/global";

export type CalendarProps = {
  data: SchedulerData;
  topBarWidth: number;
  onTileClick?: (data: SchedulerProjectData) => void;
  onItemClick?: (data: SchedulerItemClickData) => void;
  onCellClick?: (data: CellClickData) => void;
  onCellRangeSelect?: (data: CellRangeSelectData) => void;
  onTileMove?: (data: TileMoveData) => void;
  selectedCell?: SelectedRange | null;
  toggleTheme?: () => void;
};

export type StyledSpanProps = {
  $position: "left" | "right";
};

export type ProjectsData = [projectsPerPerson: SchedulerProjectData[][][], rowsPerPerson: number[]];
