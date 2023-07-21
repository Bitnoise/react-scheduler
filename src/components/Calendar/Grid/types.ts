import { SchedulerProjectData } from "@/types/global";

export type GridProps = {
  zoom: number;
  rows: number;
  data: SchedulerProjectData[][][];
  onItemClick?: (data: SchedulerProjectData) => void;
};

export type StyledSpanProps = {
  position: "left" | "right";
};
