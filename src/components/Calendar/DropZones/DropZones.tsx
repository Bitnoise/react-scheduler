import { DragEvent, FC, useMemo } from "react";
import { DropZonesProps } from "./types";
import { DropZone } from "./DropZone";

const DropZones: FC<DropZonesProps> = ({ data, rowsPerItem, onItemDrop }) => {
  const drop = (event: DragEvent<HTMLDivElement>, room: string, seat: string) => {
    const item = JSON.parse(event.dataTransfer.getData("application/json"));
    onItemDrop(item, { toRoom: room, toSeat: seat, id: item.id });
  };

  const placeDropZones = useMemo(() => {
    let rows = 0;
    return data.map((room, roomIndex) => {
      if (roomIndex > 0) rows += rowsPerItem[roomIndex - 1];

      let pointer = 1;
      return room.seats.map((seat, seatIndex) => {
        if (seatIndex > 0) pointer += room.seats[seatIndex - 1].data.length;

        const topPosition = (pointer + rows) * 38;

        return (
          <DropZone
            key={`${seat.id}-${pointer + rows}`}
            topPosition={topPosition}
            onDragOver={(event: DragEvent<HTMLDivElement>) => event.preventDefault()}
            onDrop={(event: DragEvent<HTMLDivElement>) => drop(event, room.id, seat.id)}
          />
        );
      });
    });
  }, [data, rowsPerItem]);

  return <>{placeDropZones}</>;
};

export default DropZones;
