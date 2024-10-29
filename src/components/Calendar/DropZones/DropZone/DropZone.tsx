import { FC, useCallback, useState } from "react";
import { useCalendar } from "@/context/CalendarProvider";
import { getFocusedDate } from "@/utils/getFocusedDate";
import { DropZoneProps } from "./types";
import { StyledDropZone } from "./styles";

const DropZone: FC<DropZoneProps> = ({ topPosition, roomId, seatId, zoom, onItemDrop }) => {
  const { startDate } = useCalendar();
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const drop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, room: string, seat: string) => {
      const item = JSON.parse(event.dataTransfer.getData("application/json"));
      const dropZoneRect = event.currentTarget.getBoundingClientRect();

      const position = event.clientX - dropZoneRect.left;
      const date = getFocusedDate(startDate, position, zoom, item.fromStart, item.fromEnd);
      onItemDrop(item, {
        toRoom: room,
        toSeat: seat,
        id: item.id,
        start: date.start,
        end: date.end
      });

      setIsDraggedOver(false);
    },
    [zoom, startDate, onItemDrop]
  );

  const handleDragEnter = () => setIsDraggedOver(true);
  const handleDragLeave = () => setIsDraggedOver(false);

  return (
    <StyledDropZone
      isDraggedOver={isDraggedOver}
      topPosition={topPosition}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => event.preventDefault()}
      onDrop={(event: React.DragEvent<HTMLDivElement>) => drop(event, roomId, seatId)}
    />
  );
};

export default DropZone;
