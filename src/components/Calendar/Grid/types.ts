import { PaginatedSchedulerData, SchedulerProjectData, From, To } from "@/types/global";

export type GridProps = {
  zoom: number;
  rows: number;
  data: PaginatedSchedulerData;
  rowsPerItem: number[];
  onTileClick?: (data: SchedulerProjectData) => void;
  onItemDrop: (from: From, to: To) => void;
};

export type StyledSpanProps = {
  position: "left" | "right";
};
