import { SchedulerProjectData } from "@/types/global";

export type TilesProps = {
  zoom: number;
  data: SchedulerProjectData[][][];
  onItemClick?: (data: SchedulerProjectData) => void;
};

export type PlacedTiles = JSX.Element[];
