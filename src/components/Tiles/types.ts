import { SchedulerProjectData } from "@/types/global";

export type TilesProps = {
  zoom: number;
  data: SchedulerProjectData[][][];
};

export type PlacedTiles = JSX.Element[];
