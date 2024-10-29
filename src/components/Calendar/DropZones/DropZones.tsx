/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useMemo } from "react";
import { DropZonesProps } from "./types";
import { DropZone } from "./DropZone";

const DropZones: FC<DropZonesProps> = ({ data, rowsPerItem, zoom, onItemDrop }) => {
  const placeDropZones = useMemo(() => {
    let rows = 0;
    return data.map((room, roomIndex) => {
      if (roomIndex > 0) rows += rowsPerItem[roomIndex - 1];

      let pointer = 1;
      return room.seats.map((seat, seatIndex) => {
        if (seatIndex > 0) pointer += room.seats[seatIndex - 1].data.length;

        const topPosition = pointer + rows;

        return (
          <DropZone
            key={`${seat.id}-${pointer + rows}`}
            topPosition={topPosition}
            roomId={room.id}
            seatId={seat.id}
            zoom={zoom}
            onItemDrop={onItemDrop}
          />
        );
      });
    });
  }, [data, rowsPerItem, zoom]);

  return <>{placeDropZones}</>;
};

export default DropZones;
