import { FC, useState } from "react";
import { DropZoneProps } from "./types";
import { StyledDropZone } from "./styles";

const DropZone: FC<DropZoneProps> = ({ topPosition, roomId, seatId, onItemDrop }) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const drop = (event: React.DragEvent<HTMLDivElement>, room: string, seat: string) => {
    const item = JSON.parse(event.dataTransfer.getData("application/json"));
    onItemDrop(item, { toRoom: room, toSeat: seat, id: item.id });
    setIsDraggedOver(false);
  };

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
