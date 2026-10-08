import { SchedulerProjectData } from "@/types/global";

export type TileProps = {
  row: number;
  data: SchedulerProjectData;
  zoom: number;
  onTileClick?: (data: SchedulerProjectData) => void;
  /**
   * When true, the tile can be dragged to reschedule it (an ancestor is
   * expected to handle the drop and call the consumer's onTileMove)
   */
  draggable?: boolean;
  /**
   * Fired when the tile starts being dragged, with the number of cells between the
   * tile's start and the point it was grabbed at
   */
  onDragStart?: (grabOffset: number) => void;
  onDragEnd?: () => void;
  /**
   * When true, the tile is rendered as a non-interactive ghost showing where a dragged
   * tile would land
   */
  preview?: boolean;
};

export type StyledTileWrapperProps = {
  $preview?: boolean;
};

export type StyledTextProps = {
  $bold?: boolean;
};
