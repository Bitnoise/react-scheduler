import { From, To } from "@/types/global";

export type DropZoneProps = {
  topPosition: number;
  roomId: string;
  seatId: string;
  onItemDrop: (from: From, to: To) => void;
};
