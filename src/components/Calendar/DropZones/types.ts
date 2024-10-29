import { PaginatedSchedulerData, From, To, ZoomLevel } from "@/types/global";

export type DropZonesProps = {
  data: PaginatedSchedulerData;
  rowsPerItem: number[];
  zoom: ZoomLevel;
  onItemDrop: (from: From, to: To) => void;
};
