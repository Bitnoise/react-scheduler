import { PaginatedSchedulerData, SchedulerProjectData } from "@/types/global";

export type TilesProps = {
  zoom: number;
  data: PaginatedSchedulerData;
  onItemClick?: (data: SchedulerProjectData) => void;
};

export type PlacedTiles = JSX.Element[];
