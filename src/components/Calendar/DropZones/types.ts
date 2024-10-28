import { PaginatedSchedulerData, From, To } from "@/types/global";

export type DropZonesProps = {
  data: PaginatedSchedulerData;
  rowsPerItem: number[];
  onItemDrop: (from: From, to: To) => void;
};
