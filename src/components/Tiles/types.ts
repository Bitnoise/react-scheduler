import type { JSX } from "react";
import { PaginatedSchedulerData, SchedulerProjectData, TileMoveData } from "@/types/global";

export type TilesProps = {
  zoom: number;
  data: PaginatedSchedulerData;
  onTileClick?: (data: SchedulerProjectData) => void;
  onTileMove?: (data: TileMoveData) => void;
  onTileDragStart?: (drag: TileDragStart) => void;
  onTileDragEnd?: () => void;
};

export type TileDragStart = {
  project: SchedulerProjectData;
  resourceId: string;
  grabOffset: number;
};

export type PlacedTiles = JSX.Element[];
