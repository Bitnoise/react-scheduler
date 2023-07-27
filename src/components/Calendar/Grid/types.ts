import { PaginatedSchedulerData, SchedulerProjectData } from "@/types/global";

export type GridProps = {
  zoom: number;
  rows: number;
  data: PaginatedSchedulerData;
  onItemClick?: (data: SchedulerProjectData) => void;
};

export type StyledSpanProps = {
  position: "left" | "right";
};
