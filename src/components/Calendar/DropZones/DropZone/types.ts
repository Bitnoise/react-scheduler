import { From, To, ZoomLevel } from "@/types/global";

export type DropZoneProps = {
  topPosition: number;
  roomId: string;
  seatId: string;
  zoom: ZoomLevel;
  onItemDrop: (from: From, to: To) => void;
};
