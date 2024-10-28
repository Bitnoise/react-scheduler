import { SchedulerProjectData } from "@/types/global";

export type TileProps = {
  row: number;
  data: SchedulerProjectData;
  zoom: number;
  room: string;
  seat: string;
  onTileClick?: (data: SchedulerProjectData) => void;
};

export type StyledTextProps = {
  bold?: boolean;
};
