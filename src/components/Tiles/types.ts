import { PaginatedSchedulerData, SchedulerProjectData } from "@/types/global";
import React from "react";

export type TilesProps = {
  zoom: number;
  data: PaginatedSchedulerData;
  onTileClick?: (data: SchedulerProjectData) => void;
};

export type PlacedTiles = React.ReactElement[];
