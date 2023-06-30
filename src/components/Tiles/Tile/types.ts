import { SchedulerProjectData } from "@/types/global";

export type TileProps = {
  row: number;
  data: SchedulerProjectData;
  zoom: number;
  onItemClick: (data: SchedulerProjectData) => void;
};

export type StyledTextProps = {
  bold?: boolean;
};
